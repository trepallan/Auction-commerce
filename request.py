import requests

type = 3

if type == 1:
   url = "http://localhost:8000/home/"
   headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxODAzMDU3LCJpYXQiOjE3MDE4MDEzNjQsImp0aSI6ImQxYTJhMzYwNzhiYzRkOGJiODExYTQ1NDQzMmQxNzdjIiwidXNlcl9pZCI6MX0.KQ-krhXoYIoGRoCS3qGGw1DLJcACaRcz9LL63_JT8TQ'
   }
   response = requests.get(url, headers=headers)

elif type == 2:
   url = "http://localhost:8000/token/refresh/"
   refresh_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMTg5MTE4MiwiaWF0IjoxNzAxODA0NzgyLCJqdGkiOiJlOTFhYTFjYjcyZmM0YTVmYTNlZTgzZTRmNjdmMzQ5OSIsInVzZXJfaWQiOjF9.9CQK9jvwfCHen4egrsD9vbvSEz-xds-qXKOQN6wS6Ss"

   payload = {
      "refresh": refresh_token
   }
   headers = {
      'Content-Type': 'application/json',
     
   }
   response = requests.post(url, json=payload, headers=headers)

elif type == 3:
   url = "http://localhost:8000/logout/"
   refresh_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxODI1MjM4LCJpYXQiOjE3MDE4MjQ2MzgsImp0aSI6IjY5MmZiMDQwNDgxNTQwYjBiOWY3MDQ3NDNjMDQzY2FlIiwidXNlcl9pZCI6MX0.ZA9HNPVk_IkcZphmIJvhr5G9HQNXMMrdjNnuvLc7Zm0"

   headers = {
      'Authorization': 'Bearer {}'.format(refresh_token)
   } 
   response = requests.post(url, headers=headers)





print(response.status_code)
print(response.json())


