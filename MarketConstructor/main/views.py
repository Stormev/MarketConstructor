from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView


def index(request):
    return HttpResponse("<h1>Hello World</h1>")
