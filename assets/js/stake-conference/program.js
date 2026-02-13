let program

document.addEventListener('DOMContentLoaded', async () =>
{

  program = new StakeConferenceProgram()
  program.displayProgram()
})

class StakeConferenceProgram
{
  program = []


  displayProgram = async () =>
  {
    const params = new URLSearchParams(window.location.search)
    let year = params.get("year")
    let month = params.get("month")
    let session = params.get("session")

    if(!year) year = getCurrentYear()
    if(!month) month = 2
    if(!session) session = 'General'

    const program = await service.getStakeConferenceProgram()
    this.program = program.filter(row => row.Year == year && row.Month == month && row.Meeting == session)

    console.table(this.program)

    this.displayHeaders()
    this.displaySection('02 - Information')
    this.displaySection('03 - Opening')
    this.displaySection('04 - Meeting')
    this.displaySection('05 - Closing')
  }

  displayHeaders = async() => {
  
    const h1 = document.getElementById('meeting-header')
    const h2 = document.getElementById('meeting-sub-header')

    try {
      const header = this.program.find(row => row.Key == 'Header')
      const subHeader = this.program.find(row => row.Key == 'SubHeader')

      h1.innerText = header.Value
      h2.innerText = subHeader.Value
    }
    catch {
      h1.innerText = 'Error'
      h2.innerText = 'There was an error locating the page'
    }
  }

  displaySection = async(section) => {
    const program = this.program.filter(row => row.Section == section)

    const parent = document.getElementById('program-container')

    const sectionTemplate = document.getElementById('program-section-template').content.cloneNode(true)
    const rowContainer = sectionTemplate.getElementById('program-section-container')
    program.forEach((row) =>
    {
      const template = document.getElementById('program-row-template').content.cloneNode(true)
      let value = marked.parse(row.Value);
      value = value.replace("<p>","")
                  .replace("</p>","")
      
      template.querySelector('#key').innerHTML = `<strong>${row.Key}:</strong>`
      template.querySelector('#value').innerHTML = value

      rowContainer.appendChild(template)
    })
    
    parent.appendChild(sectionTemplate)

  }
}
