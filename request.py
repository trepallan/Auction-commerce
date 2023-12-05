import requests

url = "http://localhost:8000/home/"
headers = {
   'Content-Type': 'application/json',
   'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxODAzMDU3LCJpYXQiOjE3MDE4MDEzNjQsImp0aSI6ImQxYTJhMzYwNzhiYzRkOGJiODExYTQ1NDQzMmQxNzdjIiwidXNlcl9pZCI6MX0.KQ-krhXoYIoGRoCS3qGGw1DLJcACaRcz9LL63_JT8TQ'
}


response = requests.get(url, headers=headers)

print(response.status_code)
print(response.json())


