let eldersPage

let yearDropdown

document.addEventListener('DOMContentLoaded', async () => {

  yearDropdown = new YearDropdown()
  eldersPage = new EldersPage()

})

class EldersPage {

  selectedWardId = 'All'

  constructor() {

    this.displayYear()
    this.displayPPIs()
    this.displayInformation()
    
    yearDropdown.onSelectionChanged(this.selectedYearChanged)
  }


    selectedYearChanged = (year) => {        
        this.selectedYear = year
        this.displayYear()
        this.displayPPIs()
    }


    displayYear = () => {
        document.getElementById('elders-ppi-header').innerText = `PPI Schedule - ${yearDropdown.selectedYear}`
    }

  displayPPIs = async () => {
    let ppis = await service.getEldersPPIs()
    ppis = ppis.filter(ppi => ppi.Year == yearDropdown.selectedYear)
   
    // console.table(ppis)
    const parent = document.getElementById('elders-ppi-table')
    parent.innerText = ''

    ppis.forEach(row => {

      const div = document.getElementById('elders-ppi-row-template').content.cloneNode(true)

      div.querySelector('.row-ppi-ward').innerText = row.WardId
      div.querySelector('.row-ppi-q1').innerText = row.Spring
      div.querySelector('.row-ppi-q2').innerText = row.Fall

      div.querySelector('.cell-ppi-ward').innerText = row.WardId
      div.querySelector('.cell-ppi-q1').innerText = row.Spring
      div.querySelector('.cell-ppi-q2').innerText = row.Fall

      parent.appendChild(div)
    });

  }


  displayInformation = async () => {
    const generalInfo = await service.getGeneralInformation()

    const row = generalInfo.find(info => info.Section === 'Elders' && info.Key === 'Elders Quorum PPIs')

    if (!row) return

    // document.getElementById('elders-quorum-header').innerText = row.Header

    const content = marked.parse(row.Value)
    document.getElementById('elders-quorum-content').innerHTML = content

  }
}