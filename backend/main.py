from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
import time
import requests

app = FastAPI()

# Enable CORS for frontend to communicate with the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/scrape")
async def scrape_product(request: Request):
    data = await request.json()
    print(data," ", data['product_name'])
    product_name = data['product_name']
    item_type = data['item_type']
    make = data['make']
    model = data['model']

    search_url = f"https://www.bing.com/shop?q={product_name}+{item_type}+{make}+{model}".replace(' ', '+')
    HEADERS = ({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0',
        'Accepted-Language': 'en-US, en;q=0.5'
    })

    response = requests.get(search_url, headers=HEADERS)
    soup = BeautifulSoup(response.content, 'html.parser')

    bing_sources = soup.find_all('a', {'class': 'br-titlelink sj_spcls'})
    for i in range(len(bing_sources)):
        bing_sources[i] = "https://www.bing.com" + bing_sources[i].get('href')

    bing_sources = list(set(bing_sources))

    product_details = []
    count = 0
    result_count = 6  # Number of results to display

    for url in bing_sources:
        if count < result_count:
            try:
                raw_product_page = requests.get(url, headers=HEADERS)
                product_page = BeautifulSoup(raw_product_page.content, 'html.parser')

                title = product_page.find('h1', {'class': 'br-pdTtl'}).text.strip()
                price = product_page.find('span', {'class': 'br-oboSnDp'}).text.strip()
                source_name = product_page.find('div', {'class': 'br-oboSnSn'}).text.strip()
                source_link = product_page.find('a', {'class': 'br-oboSnOptLink'}).get('href')

                product_details.append({
                    'Title': title,
                    'Price': price,
                    'Source Name': source_name,
                    'Source Link': source_link
                })
                count += 1

            except Exception as e:
                print(f"Error scraping {url}: {e}")
                continue
    
    print(product_details)
    return {"products": product_details}


@app.post("/SpecificScrape")
async def SpecificScrape(request:Request):
    data = await request.json()
    print(data," ", data['product_name'])
    item_name = data['product_name']
    item_type = data['item_type']
    specifications = data.get('specifications', [])  # This is an array
    desired_price = data.get('desired_price')

# Since specifications is an array, let's extract the first specification
    if len(specifications) > 0:
        item_specification = specifications[0].get('specName')  # Only grabbing the first specification for now
    else:
        item_specification = ''

    search_url = f"https://www.bing.com/shop?q={item_name}+{item_type}+{item_specification}".replace(' ', '+')
    HEADERS = ({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0',
    'Accepted-Language': 'en-US, en;q=0.5'
    })
    response = requests.get(search_url, headers=HEADERS)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Finding the product links from the search result
    bing_sources = soup.find_all('a', {'class': 'br-titlelink sj_spcls'})

    # Extract the href (URL) for each product and construct the full link
    for i in range(len(bing_sources)):
        bing_sources[i] = "https://www.bing.com" + bing_sources[i].get('href')

    # Remove duplicate links
    bing_sources = list(set(bing_sources))

    # Function to clean and convert price string to float
    def clean_price(price_str):
        # Remove currency symbols and commas
        price_str = price_str.replace('₹', '').replace('$', '').replace(',', '').strip()
        
        # Handle cases where price_str is still non-numeric (edge case)
        try:
            return float(price_str)
        except ValueError:
            return None  # Return None if price conversion fails

    # Function to traverse each product webpage and scrape the required details
    def traversingEachWebpage():
        count = 0
        result_count = 6  # Number of results to display
        product_details = []

        for url in bing_sources:
            if count < result_count:
                try:
                    raw_product_page = requests.get(url, headers=HEADERS)
                    product_page = BeautifulSoup(raw_product_page.content, 'html.parser')

                    # Scraping the product title (item name)
                    title = product_page.find('h1', {'class': 'br-pdTtl'}).text.strip()

                    # Scraping the product price and cleaning it
                    price_text = product_page.find('span', {'class': 'br-oboSnDp'}).text.strip()
                    price = clean_price(price_text)

                    # If price couldn't be extracted, skip this product
                    if price is None:
                        print(f"Skipping product due to invalid price: {price_text}")
                        continue

                    # Filtering the product based on the price condition
                    if abs(price - desired_price) <= 5000:  # Allowing for a price range of ±5000 (or adjust as needed)
                        # Scraping the brand name (make)
                        # make = product_page.find('span', {'class': 'br-pdMk'}).text.strip() if product_page.find('span', {'class': 'br-pdMk'}) else "Unknown Make"
                        make = title.split()[0] if title.split() else "Unknown Make"
                        # Scraping the model (assuming the model is available under this tag)
                        model = product_page.find('span', {'class': 'br-pdMd'}).text.strip() if product_page.find('span', {'class': 'br-pdMd'}) else "Unknown Model"

                        # Scraping the source link (where the product is sold)
                        source_link = product_page.find('a', {'class': 'br-oboSnOptLink'}).get('href')

                        # Storing the scraped data
                        product_details.append({
                            'Title': title,
                            'Type': item_type,
                            'Make': make,
                            'Model': title,
                            'Price': f"{price_text}",  # Keeping the original price string (with currency)
                            'Source Link': source_link
                        })

                        count += 1

                except Exception as e:
                    print(f"Error scraping {url}: {e}")
                    continue
            else:
                break

        return product_details

    # Scraping product details
    product_data = traversingEachWebpage()
    print(product_data)
    return product_data


@app.post("/ServiceScrape")
async def ServiceScrape(request:Request):
    data = await request.json()
    print(data," ", data['service_type'])
    service_type = data['service_type']
    location = data['location']
    description = data.get('description', [])  # This is an array

# Since specifications is an array, let's extract the first specification
    if len(description) > 0:
        description = description[0].get('descpName')  # Only grabbing the first specification for now
    else:
        description = ''

    def initialize_driver():
        firefox_options = Options()
        firefox_options.add_argument("--headless")  # Run in headless mode
        firefox_options.add_argument("--no-sandbox")
        firefox_options.add_argument("--disable-dev-shm-usage")

        # Initialize Firefox driver
        driver = webdriver.Firefox(options=firefox_options)
        return driver

    search_query = f"{service_type} {location} {description}"
    driver = initialize_driver()

    driver.get("https://dir.indiamart.com/")

    time.sleep(3)

    search_input = driver.find_element(By.ID, "search_string")
    search_input.send_keys(search_query)

    # Click the search button
    search_button = driver.find_element(By.ID, "btnSearch")
    search_button.click()

    # Wait for the results page to load
    time.sleep(3)
    page_source = driver.page_source
    soup = BeautifulSoup(page_source, 'html.parser')

    # After extracting service cards
    service_cards = soup.find_all('a', class_='cardlinks')

    # Extract the href (URL) for the 0th, 2nd, 4th, 6th, and 8th card links (0-based index)
    selected_links = [service_cards[i].get('href') for i in [0, 2, 4 , 6 , 8 , 10] if i < len(service_cards)]

    service_details = []

    for link in selected_links:
        try:
            driver.get(link)  # Visit the info page
            time.sleep(3)  # Wait for the page to load

            service_page_source = driver.page_source
            service_page = BeautifulSoup(service_page_source, 'html.parser')

            # Extract details
            service_name = service_page.find('h2', class_='fs15 bo').text.strip() if service_page.find('h2', class_='fs15 bo') else "Service name not found"
            price = service_page.find('span', class_='bo price-unit').text.strip() if service_page.find('span', class_='bo price-unit') else "Price not listed"
            provider_name = service_page.find('a', class_='color6 bo atxu').text.strip() if service_page.find('a', class_='color6 bo atxu') else "Provider name not found"
            website_link = service_page.find('a', class_='color6 bo atxu')['href'] if service_page.find('a', class_='color6 bo atxu') else "Website link not found"

            # Clean up the website link to remove content after the first space
            website_link = website_link.split(' ')[0]  # Take the part before the first space

            # Append the details to the list
            service_details.append({
                'Service Name': service_name,
                'Price': price,
                'Provider Name': provider_name,
                'Website Link': website_link,
                'Vintage': '',  # Placeholder for date
                'Source': link.split(' ')[0]  # Take the part before the first space
            })

        except Exception as e:
            print(f"Error while scraping {link}: {e}")


    driver.quit()
    return service_details
    