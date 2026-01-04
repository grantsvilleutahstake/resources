let speakingAssignments

let bishopDropdown
let speakerDropdown
let yearDropdown
let monthDropdown

document.addEventListener('DOMContentLoaded', async () => {

  bishopDropdown = new BishopDropdown()
  speakerDropdown = new SpeakerDropdown()
  yearDropdown = new YearDropdown()
  monthDropdown = new MonthDropdown()

  speakingAssignments = new SpeakingAssignments()

})

class SpeakingAssignments {

  selectedYear
  generalInfo
  topics
  assignments
  currentAssignments
  callings
  wards
  buildings

  constructor() {
    this.init()

    const hide = document.getElementById('hide-speaking-details')
    const show = document.getElementById('show-speaking-details')

  }

  init = async () => {
    this.selectedYear = getCurrentYear()
    this.generalInfo = await service.getGeneralInformation()
    this.topics = await service.getSpeakingTopics()
    this.assignments = await service.getSpeakingAssignments()
    this.callings = await service.getCallings()
    this.wards = await service.getWards()
    this.buildings = await service.getBuildings()
    console.table(this.wards)

    yearDropdown.onSelectionChanged(this.selectedYearChanged)
    monthDropdown.onSelectionChanged(this.selectedMonthChanged)
    bishopDropdown.onSelectionChanged(this.selectedBishopChanged)
    speakerDropdown.onSelectionChanged(this.selectedSpeakerChanged)

    // this.selectedYear = new Date().getFullYear()
    this.displayYear()
    this.displaySpeakingInstructions()
    this.displayAssignments()
  }

  selectedYearChanged = (year) => {        
      this.selectedYear = year
      this.displayYear()
      this.displayAssignments()
  }

  selectedMonthChanged = (month) => {        
      this.selectedMonth = month
      this.displayAssignments()
  }

  selectedBishopChanged = (wardId) => {
      this.selectedWardId = wardId
      this.displayAssignments()
  }

  selectedSpeakerChanged = (speakerId) => {
      this.selectedSpeakerId = speakerId
      this.displayAssignments()
  }

  displayYear = () => {
    document.getElementById('speaking-year').innerText = yearDropdown.selectedYear
  }

  displaySpeakingInstructions = () => {
    const row = this.generalInfo.find(info => info.Section === 'Speaking' && info.Key === 'Instructions')

    if (!row) return

    document.getElementById('speaking-instructions-header').innerText = row.Header
    const instructionsContainer = document.getElementById('speaking-instructions')
    try {
    instructionsContainer.innerHTML = marked.parse(row.Value)
    }catch(e){
      console.log(e);
      
    }
  }

  displayAssignments = () => {
    const selectedYear = yearDropdown.selectedYear
    const selectedMonth = monthDropdown.selectedMonth
    const selectedWardId = bishopDropdown.selectedBishopId
    const speakerId = speakerDropdown.selectedSpeakerId

    const topics = this.topics.filter(topic => topic.HasSpeakers)
                              .filter(topic => selectedYear == topic.Year)
                              .filter(topic => selectedMonth == 0 || topic.Month == selectedMonth)

    this.currentAssignments = this.assignments.filter(assignment => assignment.Year == selectedYear)
                                              .filter(assignment => selectedMonth == 0 || assignment.Month == selectedMonth)
                                              .filter(assignment => selectedWardId == 'All' || selectedWardId == 0 || assignment.WardId == selectedWardId)
                                              .filter(assignment => {
                                                if (speakerId == 0) return true
                                                return  (assignment.HighCouncilId == speakerId) || (assignment.AuxilliaryId == speakerId)
                                              })

   

    const parent = document.getElementById('speaking-topics-container')
    parent.innerText = ''

    topics.forEach(topic => {

      const template = document.getElementById('speaking-topic-template').content.cloneNode(true)
      template.getElementById('speaking-date').innerText = `${topic.MonthName} - ${topic.Date}`
      template.getElementById('topic-name').innerText = topic.Topic
      try {
        template.getElementById('topic-resources').innerHTML = marked.parse(topic.Resources)
      }catch{}

      const wardContainer = template.getElementById('speaking-wards')
      const hasSpeakers = this.displayWardAssignments(topic.Month, wardContainer)

      if(hasSpeakers ) {
        parent.appendChild(template)
      }
    })
  }

  displayWardAssignments = (month, parent) => {
    const assignments = this.currentAssignments.filter(assignment => assignment.Month == month)
    const wards = this.wards.filter(ward => ward.Year == this.selectedYear)

    assignments.forEach(assignment => {

      const auxilliary = this.callings.find(calling => calling.SpeakerId == assignment.AuxilliaryId)
      const highCouncilor = this.callings.find(calling => calling.SpeakerId == assignment.HighCouncilId)
      const ward = wards.find(ward => ward.Id == assignment.WardId)
      const building = this.buildings.find(building => building.BuildingId == ward.BuildingId)

      const template = document.getElementById('ward-assignment-template').content.cloneNode(true)
      template.getElementById('ward-name').innerText = assignment.WardId
      template.getElementById('ward-time').innerText = ward.SacramentMeeting
      template.getElementById('building-name').innerText = `( ${building.Name} )`
      template.getElementById('auxilliary-name').innerText = `${auxilliary.Name} (${auxilliary.SpeakingAbbreviation})`
      template.getElementById('high-council-name').innerText = `${highCouncilor.Name} (${highCouncilor.SpeakingAbbreviation})`

      parent.appendChild(template)
    })

    return assignments.length > 0
  }

}
