//REDUCER
export const takeImg = (state=false,action) =>
{
    switch(action.type){
        case 'TAKE_IMG':
            return !state;
        default:
            return state;
    }
}
export const startTraining = (state=false,action) => {
    switch(action.type){
        case 'START_TRAINING':
            return !state;
        default:
            return state;
    }
}
export const trainingFinished = (state=true,action) => {
    switch(action.type){
        case 'TRAINING_FINISHED':
            return action.payload;
        default:
            return state;
    }
}
export const removeLabelOnServer = (state="",action) => {
    switch(action.type){
        case 'REMOVE_LABEL_FROM_SERVER':
            return action.payload;
        default:
            return state;
    }
}