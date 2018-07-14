import re
import requests
from bs4 import BeautifulSoup

url = "https://www.linkedin.com/jobs/view/718914567/"

r = requests.get(url)
soup = BeautifulSoup(r.content, "html5lib")
# results = soup.find_all("div", attrs={"data-control-name": "A_jobssearch_job_result_click"})
# print(results)

pat1 = re.compile('data-job-id')

# xx = re.search(pat1, soup)
xx = pat1.findall(str(soup))
print (xx)

with open("./tmp.txt", 'wt') as f:
    f.write(str(soup))