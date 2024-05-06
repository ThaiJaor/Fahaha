from rest_framework import views, status
from rest_framework.response import Response
from chatbox.utils import send_code_to_api

# Create your views here.
class CodeExplainView(views.APIView):

    def post(self, request, format=None):
        _input = request.data.get("_input")
        
        if not _input:
            return Response({"error": "_input field is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Send code to API and get output
        _output = send_code_to_api(_input)
        
        return Response({"_input":_input,"_output": _output}, status=status.HTTP_201_CREATED)