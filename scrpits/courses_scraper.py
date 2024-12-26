from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
import time
from bs4 import BeautifulSoup
import json
import shutil

driver = webdriver.Chrome()
driver.get('https://act.ucsd.edu/scheduleOfClasses/scheduleOfClassesStudent.htm')

select_tag = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, 'selectedSubjects')))
select = Select(select_tag)
options = select.options

for i in range(len(options) - 180):
    select.select_by_index(i)

search_button = driver.find_element(By.ID, 'socFacSubmit')
search_button.click()
time.sleep(2)

soup = BeautifulSoup(driver.page_source, 'html.parser')

page_num = 1
pagination_text = soup.find('td', align='right').get_text(strip=True)
total_pages = int(pagination_text.split('of')[-1].split(')')[0].strip())

course_values = []
course_labels = []

while page_num <= total_pages:
    soup = BeautifulSoup(driver.page_source, 'html.parser')

    for td in soup.find_all('td', {'colspan': '13'}):
        h2 = td.find('h2')
        if h2 and '(' in h2.text:
            department_abbreviation = h2.text.split('(')[-1].split(')')[0].rstrip()

            course_numbers = []
            course_titles = []
            
            tag = td
            while tag:
                tr = tag.find_next('tr')
                
                if not tr:
                    break

                tds_in_tr = tr.find_all('td')
                if len(tds_in_tr) == 4:
                    course_numbers.append(tds_in_tr[1].get_text(strip=True))
                    course_titles.append(tds_in_tr[2].find('span').get_text(strip=True))
                
                if tr.find_next('td').get('colspan') == '13':
                    break

                tag = tr

            for num, title in zip(course_numbers, course_titles):
                course_name = department_abbreviation + ' ' + num
                course_values.append(course_name)
                course_labels.append(course_name + ' - ' + title)
            
    
    if page_num < total_pages:
        next_page = driver.find_element(By.LINK_TEXT, str(page_num + 1))
        next_page.click()
        time.sleep(2)
    
    page_num += 1
    
seen = set()
course_data = []

for val, label in zip(course_values, course_labels):
    if val not in seen and label not in seen:
        course_data.append({'value': val, 'label': label})
        seen.add(val)
        seen.add(label)

with open('courses.json', 'w') as f:
    json.dump(course_data, f, indent=4)

shutil.move('courses.json', '../frontend/src/data/')

driver.quit()
