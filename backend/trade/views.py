from django.http import JsonResponse
from rest_framework.views import APIView
from utils import get_db_handle
from datetime import datetime

import requests
import pytz


api_key = "dummy value"
db_handle, client = get_db_handle("my_database")

class PortfolioView(APIView):
    collection = db_handle["portfolio"]

    def get(self, request):
        user_id = request.data.get('user_id')
        query = {'user_id', user_id}
        user_data = collection.find_one(query)
        if user_data:
            return JsonResponse({'status': 'success', 'user_data': user_data}, status=200)
        else:
            return JsonResponse({'status': 'failure', 'message': 'No active portfolio'}, status=400)

class TransactionView(APIView):
    collection = db_handle["transactions"]
    def get(self, request):
        user_id = request.data.get('user_id')
        query = {'user_id', user_id}
        user_data = collection.find(query)
        if user_data:
            return JsonResponse({'status': 'success', 'user_data': user_data}, status=200)
        else:
            return JsonResponse({'status': 'failure', 'message': 'No transaction history'}, status=400)

class DepositView(APIView):
    collection = db_handle["portfolio"]
    
    def post(self, request):
        user_id = request.data.get('user_id')
        amount = request.data.get('amount')
        
        query = {'user_id': user_id}
        user_data = collection.find_one(query)

        account_balance = 0
        if user_data:
            original_amount = user_data['cash']
            account_balance = original_amount + amount
            new_entry = {'$set': {'cash': account_balance}}
            collection.update_one(query, new_entry)
        else:
            account_balance = amount
            new_entry = {'user_id' : user_id, 'cash': account_balance}
            collection.insert_one(new_entry)
        
        return JsonResponse({'status': 'success', 'account_balance': account_balance}, status=200)
    
class WithdrawView(APIView):
    collection = db_handle["portfolio"]
    
    def post(self, request):
        user_id = request.data.get('user_id')
        amount = request.data.get('amount')
        
        query = {'user_id': user_id}
        user_data = collection.find_one(query)

        account_balance = 0
        if user_data:
            original_amount = user_data['cash']
            account_balance = original_amount - amount
            if account_balance < 0:
                return JsonResponse({'status': 'failure', 'message': 'Not enough cash to execute proposed withrawal'}, status=400)
            new_entry = {'$set': {'cash': account_balance}}
            collection.update_one(query, new_entry)
        else:
            return JsonResponse({'status': 'failure', 'message': 'Not enough cash to execute proposed withrawal'}, status=400)
        
        return JsonResponse({'status': 'success', 'message': 'Successful withdrawal', 'account_balance': account_balance}, status=200)


class TradeView(APIView):
    collection = db_handle["portfolio"]
    collection2 = db_handle["transactions"]

    def post(self, request):
        ticker = request.data.get('ticker')
        quantity = request.data.get('quantity')
        user_id = request.data.get('user_id')
        action = request.data.get('action')

        query = {'user_id', user_id}
        user_data = collection.find_one(query)
        if not user_data:
            new_entry = {'user_id': user_id, 'cash': 0}
            collection.insert_one(new_entry)
            user_data = collection.find_one('user_id', user_id)

        cash_available = user_data['cash']
        response_stock = requests.get("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&ticker" 
                                    + ticker + "&apikey=" + api_key).json()
        
        if response_stock['Global Quote']:
            price = round(response_stock['Global Quote']['price'], 2)
            stocks = user_data.get('stocks')
            original_quantity = stocks.get(ticker)
            new_entry = {}

            if action == 'buy':
                if cash_available >= price * quantity:
                    if stocks and ticker in stocks:
                        new_quantity = original_quantity + quantity
                        new_entry = {'$set': {'stocks.' + ticker: new_quantity}}
                    else:
                        new_entry = {'$set': {'stocks.' + ticker: quantity}}

                    collection.update_one(query, new_entry)

                    # update cash balance from sale
                    new_cash = cash_available - (price * quantity)
                    new_entry = {'$set': {'cash': new_cash}}
                    collection.update_one(query, new_entry)

                    # insert record into transaction collection
                    date_time = datetime.now(pytz.timezone('America/Toronto')).replace(microsecond=0)
                    trans_record = {'user_id': user_id, 'action': action, 'price': price, 'quantity': quantity, 'date': date_time}
                    collection2.insert_one(trans_record)
            elif action == 'sell':
                if original_quantity:
                    if original_quantity > quantity:
                        new_quantity = original_quantity - quantity
                        new_entry = {'$set': {'stocks.' + ticker: new_quantity}}
                        collection.update_one(query, new_entry)
                    elif original_quantity == quantity:
                        new_entry = {'$unset': {'stocks.' + ticker: ''}}
                        collection.update_one(query, new_entry)

                    # update cash balance from sale
                    new_cash = cash_available + (price * quantity)
                    new_entry = {'$set': {'cash': new_cash}}
                    collection.update_one(query, new_entry)
                    
                    # insert record into transaction collection
                    date_time = datetime.now(pytz.timezone('America/Toronto')).replace(microsecond=0)
                    trans_record = {'user_id': user_id, 'action': action, 'price': price, 'quantity': quantity, 'date': date_time}
                    collection2.insert_one(trans_record)

                    if original_quantity < quantity:
                        return JsonResponse({
                            'status': 'failure',
                            'message': 'Not enough shares owned to sell the given number'
                        }, status=400)
            else:
                return JsonResponse({
                            'status': 'failure',
                            'message': 'Invalid action. Must be "buy" or "sell"'
                        }, status=400)
            
        return JsonResponse({
                    'status': 'failure',
                    'message': 'Invalid ticker given'
                }, status=400)
            
    
