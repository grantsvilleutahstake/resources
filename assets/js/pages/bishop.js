let bishopPage
let bishopDropdown

document.addEventListener('DOMContentLoaded', async () => {


  bishopDropdown = new BishopDropdown()

  bishopPage = new BishopPage()

})

class BishopPage {

  selectedWardId = 'All'

  constructor() {

    this.displayBishopPPIs()
    this.displayTransientBishopInformation()
    
    bishopDropdown.onSelectionChanged(this.selectedBishopChanged)
  }


  selectedBishopChanged = (wardId) => {
      this.selectedWardId = wardId
      this.displayBishopPPIs()
  }


  displayBishopPPIs = async () => {
    let ppis = await service.getBishopPPIs()
    if (this.selectedWardId != 'All') {
      ppis = ppis.filter(row => {
          return row.WardId == this.selectedWardId
      })  
    }
    console.table(ppis)
    const parent = document.getElementById('bishop-ppi-table')
    parent.innerText = ''

    ppis.forEach(row => {

      const div = document.getElementById('bishop-ppi-row-template').content.cloneNode(true)

      div.querySelector('.row-ppi-ward').innerText = row.WardId
      div.querySelector('.row-ppi-time').innerText = row.Time
      div.querySelector('.row-ppi-q1').innerText = row.Q1
      div.querySelector('.row-ppi-q2').innerText = row.Q2
      div.querySelector('.row-ppi-q3').innerText = row.Q3
      div.querySelector('.row-ppi-q4').innerText = row.Q4

      div.querySelector('.cell-ppi-ward').innerText = row.WardId
      div.querySelector('.cell-ppi-time').innerText = row.Time
      div.querySelector('.cell-ppi-q1').innerText = row.Q1
      div.querySelector('.cell-ppi-q2').innerText = row.Q2
      div.querySelector('.cell-ppi-q3').innerText = row.Q3
      div.querySelector('.cell-ppi-q4').innerText = row.Q4

      parent.appendChild(div)
    });

  }


  displayTransientBishopInformation = async () => {
    const generalInfo = await service.getGeneralInformation()

    const row = generalInfo.find(info => info.Section === 'Bishops' && info.Key === 'Transient Bishop')

    if (!row) return

    document.getElementById('transient-bishop-header').innerText = row.Header

    const content = marked.parse(row.Value)
    document.getElementById('transient-bishop-content').innerHTML = content

  }
}