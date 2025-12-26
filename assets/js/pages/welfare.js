let wardsFilter
let bishopDropdown

let welfareServices

document.addEventListener('DOMContentLoaded', async () =>
{
  welfareServices = new WelfareServices()
  

  yearDropdown = new YearDropdown()
  bishopDropdown = new BishopDropdown()

  // defined in helpers.js
  displaySection('Welfare', 'Welfare', 'welfare-header', 'welfare-content')

})

class WelfareServices
{
  selectedWardId = 'All'
  selectedYear = 0
  allWards

  constructor()
  {
    this.init()
  }

  init = async () =>
  {
    this.selectedYear = await getCurrentYear()
    this.allWards = await service.getWards()
    console.table(this.allWards)

    this.displayYear()
    this.displayWards()
    
    yearDropdown.onSelectionChanged(this.selectedYearChanged)
    bishopDropdown.onSelectionChanged(this.selectedBishopChanged)
  }


  selectedYearChanged = (year) =>
  {
      this.selectedYear = year
      this.displayYear()
      this.displayWards()
  }

  selectedBishopChanged = (wardId) =>
  {
      this.selectedWardId = wardId
      this.displayWards()
  }

  displayYear = () =>
  {
    document.getElementById('year-holder').innerHTML = `${this.selectedYear} &nbsp`
  }


  displayWards = async () =>
  {
    if (!service) return

    let welfareAssignments = await service.getWelfare()
    welfareAssignments = welfareAssignments.filter(assignment => assignment.Year == this.selectedYear)
    let wards = this.allWards
                    .filter(ward => ward.Year == this.selectedYear)
                    .sort((a, b) => a.SortOrder - b.SortOrder)

    if(this.selectedWardId != 'All')
    {
      wards = wards.filter(assignment => assignment.Id == this.selectedWardId)
    }

    let parent = document.getElementById('service-container')
    parent.innerText = ''

    if('content' in document.createElement('template'))
    {
      wards.forEach(async ward => {
        const template = document.getElementById('welfare-ward-row-template').content.cloneNode(true)
        const div = template.querySelector(".welfare-ward-table")   


        const assignments = welfareAssignments.filter(assignment => assignment.WardId == ward.Id)
        const totalHours = await this.displayAssignments(assignments, div)
        
        template.querySelector('.ward-name').innerText = ward.Name
        template.querySelector('.ward-service-hours').innerText = totalHours
        
        parent.appendChild(template)

      })
    }
  }

  displayAssignments = async (assignments, parent) => {
    let totalHours = 0

    assignments.forEach(assignment => {
      
      const template = document.getElementById('welfare-service-template').content.cloneNode(true)

      
      template.querySelector('.service-date').innerText = assignment.Date
      template.querySelector('.service-day').innerText = assignment.Day
      template.querySelector('.service-assignment').innerText = assignment.Assignment
      template.querySelector('.service-start').innerText = assignment.StartTime
      template.querySelector('.service-end').innerText = assignment.EndTime
      template.querySelector('.service-volunteers').innerText = assignment.People
      
      template.querySelector('.cell-service-date').innerText = assignment.Date
      template.querySelector('.cell-service-day').innerText = assignment.Day
      template.querySelector('.cell-service-assignment').innerText = assignment.Assignment
      template.querySelector('.cell-service-start').innerText = assignment.StartTime
      template.querySelector('.cell-service-end').innerText = assignment.EndTime
      template.querySelector('.cell-service-volunteers').innerText = assignment.People

      parent.appendChild(template)

      totalHours += (assignment.People * assignment.Hours)
    })

    return totalHours
  }

}