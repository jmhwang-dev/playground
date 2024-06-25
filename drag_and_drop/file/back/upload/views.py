from django.shortcuts import render

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import UploadedFile

# Create your views here.
@csrf_exempt
def file_upload_view(request):
    if request.method == 'POST':
        file_obj = request.FILES['file']
        UploadedFile.objects.create(file=file_obj)
        return JsonResponse({'message': 'File uploaded successfully'})
    return JsonResponse({'error': 'Invalid request'}, status=400)