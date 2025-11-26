let wardConferencePage
let bishopDropdown
let yearDropdown

document.addEventListener('DOMContentLoaded', async () => {

  bishopDropdown = new BishopDropdown()
  yearDropdown = new YearDropdown()

  wardConferencePage = new WardConferencePage()

})

class WardConferencePage {

  selectedWardId = 'All'
  selectedYear = 0


  constructor() {

      this.selectedYear = new Date().getFullYear()
      this.displayYear()
      this.displayWardConferences()

      yearDropdown.onSelectionChanged(this.selectedYearChanged)
      bishopDropdown.onSelectionChanged(this.selectedBishopChanged)
  }


  selectedYearChanged = (year) => {
      this.selectedYear = year

      this.displayYear()
      this.displayWardConferences()
  }


  selectedBishopChanged = (wardId) => {
      this.selectedWardId = wardId
      this.displayWardConferences()
  }


  displayYear = () => {
      document.getElementById('year-holder').innerHTML = `${this.selectedYear} &nbsp`
  }


  displayWardConferences = async () => {
    let meetings = await service.getWardConferences()
    if (this.selectedWardId != 'All') {
      meetings = meetings.filter(row => {
          return row.WardId == this.selectedWardId
      })  
    }

    meetings = meetings.filter(row => row.Year == this.selectedYear || this.selectedYear == 0)

    console.table(meetings);
    

    const parent = document.getElementById('ward-conference-table')
    parent.innerText = ''

    meetings.forEach(row => {

      const div = document.getElementById('ward-conference-row-template').content.cloneNode(true)

      div.querySelector('.ward-conference-name').innerText = row.WardId
      div.querySelector('.ward-conference-date').innerText = `${row.Month} ${row.Day}`
      div.querySelector('.ward-conference-speaker').innerText = row.Speaker

      parent.appendChild(div)
    });

  }

}