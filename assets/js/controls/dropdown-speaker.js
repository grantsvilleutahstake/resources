class SpeakerDropdown {

    selectedSpeakerId = 0
    selectionChangedListener = new EventListener(this)

    constructor() {
        this.loadSpeakers()
    }

    loadSpeakers = async () => {
        try {
            let speakers = await service.getCallings()
            speakers = speakers.filter(speaker => speaker.SpeakerId !== null)
            speakers = speakers.sort((a, b) => a.Name.localeCompare(b.Name));

            const dropdown = document.getElementById('speaker-select')
            if (dropdown) {
                dropdown.addEventListener('input', (e) => {
                    this.selectedSpeakerId = e.target.value
                    this.selectionChangedListener.raise(this.selectedSpeakerId)
                })

                speakers.forEach(speaker => {
                    const option = document.createElement("option");
                    option.value = speaker.SpeakerId;
                    option.textContent = speaker.Name;
                    dropdown.appendChild(option);
                })
            }
            
            setFilterFromUrl(dropdown, "speaker")
        this.selectedMonth = dropdown.value

        }
        catch (e) {
            console.log(e);
        }

    }

    onSelectionChanged = (callback) => {
        this.selectionChangedListener.subscribe(callback)
    }
}
