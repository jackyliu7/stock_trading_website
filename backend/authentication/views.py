from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect
from django.http import JsonResponse
#from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from django.views.decorators.http import require_http_methods

def logoutView(request):
    logout(request)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"success": True})
        else:
            return JsonResponse({"success": False, "error": "Invalid username or password"}, status=400)

#@csrf_exempt
class RegisterView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")

        if not User.objects.filter(username=username).exists():
            user = User.objects.create_user(username=username, password=password, email=email)
            user.save()

            return JsonResponse({'message': 'User created successfully'})
        else:
            return JsonResponse({'error': 'Username already exists'})