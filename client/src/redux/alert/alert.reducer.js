import * as alertActions from './alert.action';

export const alertFeatureskey = 'alertInfo';

let initialState ={
  messages:[]
};

export const reducer =(state = initialState , actions)=>{
    let {type , payload} = actions;
    switch (type) {
      case alertActions.SET_ALERT:
        return{
          ...state,
          messages : [...state.messages , payload]
        };

        case alertActions.REMOVE_ALERT:
          return{
            ...state,
            messages:[...state.messages.filter(msg => msg.id !== payload.id)]

          };
          default : return state;
    }
}