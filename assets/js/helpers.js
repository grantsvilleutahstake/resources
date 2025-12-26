function toggle(element)
{
    if(element.classList.contains('hidden'))
        element.classList.remove('hidden');
    else
        element.classList.add('hidden');
}

function parseDate(str) {
  const [month, day, year] = str.split('/').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * 
 * @param {String} section - lookup value for a Resource Guide section
 * @param {String} key - lookup value for a subsection in the resource Guide
 * @param {String} headerId - HTML id for the section header 
 * @param {String} contentId - HTML id for the content
 * @returns 
 */
async function displaySection(section, key, headerId, contentId)
{
  const generalInfo = await service.getGeneralInformation();

  const row = generalInfo.find(info => info.Section === section && info.Key === key);

  if(!row) return;

  document.getElementById(headerId).innerText = row.Header;

  document.getElementById(contentId).innerHTML = marked.parse(row.Value);

}

const yearSessionKey = `currentYear`
function getCurrentYear()
{  
  let currentYear = sessionStorage.getItem(yearSessionKey)
  
  if(currentYear) return currentYear

  return new Date().getFullYear()
}

function setCurrentYear(currentYear)
{
  sessionStorage.setItem(yearSessionKey, currentYear)
}