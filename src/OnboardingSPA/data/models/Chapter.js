export class Chapter {
    constructor( { id, name, steps, conditionalSteps = [], initialSteps = [], topSteps = [], interstitialSteps = [] }) {
        this.id = id;
        this.name = name;
        this.steps = steps.map((step) => {
            step.chapter = this.id;
            return step
        })
        this.conditionalSteps = conditionalSteps;
        this.initialSteps = initialSteps;
        this.topSteps = topSteps;
        this.interstitialSteps = interstitialSteps;
    }
}
