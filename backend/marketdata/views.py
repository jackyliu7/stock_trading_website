from django.shortcuts import render
from django.http import JsonResponse
import requests
from rest_framework.views import APIView

api_key = "dummy value"

class TickerView(APIView):
    def get(self, request):
        symbol = request.data.get('symbol')
        response_stock = requests.get("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol" 
                                      + symbol + "&apikey=" + api_key).json()
        
        if response_stock['Global Quote']:
            response = {
                'status': 'success',
                'message': 'Trade processed successfully'
            }
            return JsonResponse(response | response_stock, status=200)
        
        return JsonResponse({
            'status': 'failure',
            'message': 'symbol does not exist'
        }, status=400)


class TickerHistoryView(APIView):
    def get(self, request):
        symbol = request.data.get('symbol')
        response_stock = requests.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol" 
                                      + symbol + "&outputsize=full&apikey=" + api_key).json()

        if response_stock['Global Quote']:
            response = {
                'status': 'success',
                'message': 'Trade processed successfully'
            }
            return JsonResponse(response | response_stock, status=200)
        
        return JsonResponse({
            'status': 'failure',
            'message': 'symbol does not exist'
        }, status=400)
        
