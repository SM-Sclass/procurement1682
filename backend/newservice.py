from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
from bs4 import BeautifulSoup
import time

# Function to initialize Selenium and configure Firefox options
def initialize_driver():
    firefox_options = Options()
    firefox_options.add_argument("--headless")  # Run in headless mode
    firefox_options.add_argument("--no-sandbox")
    firefox_options.add_argument("--disable-dev-shm-usage")
    
    # Initialize Firefox driver
    driver = webdriver.Firefox(options=firefox_options)
    return driver

# Taking user input for the service query
service_type = str(input("Enter the service type: "))
location = str(input("Enter the location: "))
description = str(input("Enter a brief description of the service: "))

# Combine inputs for the search query
search_query = f"{service_type} {location} {description}"

# Initialize the Selenium WebDriver
driver = initialize_driver()

# Navigate to IndiaMART's directory page
driver.get("https://dir.indiamart.com/")

# Wait for the page to load
time.sleep(3)

# Search for the service in the search bar
search_input = driver.find_element(By.ID, "search_string")
search_input.send_keys(search_query)

# Click the search button
search_button = driver.find_element(By.ID, "btnSearch")
search_button.click()

# Wait for the results page to load
time.sleep(3)

# Get the page source and parse it with BeautifulSoup
page_source = driver.page_source
soup = BeautifulSoup(page_source, 'html.parser')

# Extract service provider cards
service_cards = soup.find_all('a', class_='cardlinks')

# Filter for the required links (1st, 3rd, 5th)
selected_links = [service_cards[i].get('href') for i in [0, 2, 4 , 6 , 8 , 10] if i < len(service_cards)]

# Collect required information from the selected info pages
service_details = []

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

# Close the WebDriver after scraping
driver.quit()

# Print the scraped data
for service in service_details:
    print(f"Service Name: {service['Service Name']}")
    print(f"Price: {service['Price']}")
    print(f"Provider Name: {service['Provider Name']}")
    print(f"Website Link: {service['Website Link']}")
    print(f"Vintage: {service['Vintage']}")
    print(f"Source: {service['Source']}")
    print("-" * 50)
