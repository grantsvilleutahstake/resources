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
  wards

  constructor()
  {
    this.init()
  }

  init = async () => {

      this.selectedYear = getCurrentYear()
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
    let wards = await service.getWards()
    let buildings = await service.getBuildings()

    wards = wards.filter(ward => ward.Year == this.selectedYear)

    meetings = meetings.filter(row => row.Year == this.selectedYear || this.selectedYear == 0)
    if (this.selectedWardId != 'All') {
      meetings = meetings.filter(row => {
          return row.WardId == this.selectedWardId
      })  
    }


    const parent = document.getElementById('ward-conference-table')
    parent.innerText = ''

    meetings.forEach(row => {

      const ward = wards.find(ward => ward.Id == row.WardId && ward.Year == this.selectedYear )
      const building = buildings.find(building => building.BuildingId == ward.BuildingId)

      const div = document.getElementById('ward-conference-row-template').content.cloneNode(true)

      div.querySelector('.ward-conference-name').innerText = ward.Name
      div.querySelector('.ward-time').innerText = ward.SacramentMeeting
      div.querySelector('.building-name').innerText = building.Name
      div.querySelector('.ward-conference-date').innerText = `${row.Month} ${row.Day}`
      div.querySelector('.ward-conference-speaker').innerText = row.Speaker

      parent.appendChild(div)
    });

  }

}