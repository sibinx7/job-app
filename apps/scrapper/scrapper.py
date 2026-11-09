import requests 
from bs4 import BeautifulSoup 

url = "https://infopark.in/companies-job"

# Headers to mimic a real browser request
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.text, 'html.parser')

quotes = soup.select('td.btn-sec a')

for quote in quotes:
  href = quote.get('href')
  print(href)