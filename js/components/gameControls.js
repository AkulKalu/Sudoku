import {boardControls} from '../eventHandlers/play.js';

export function gameControls() {
    const el = document.createElement('div');
    el.innerHTML =` 
                        <div class="flex-col-c icon-wrap">
                            <img class="icon f-yellow" src="content/erase.svg" id=${ids.CLEAR_BTN} ></img>
                            <label for=${ids.CLEAR_BTN}>CLEAR</label>
                        </div>
                        <div class="flex-col-c icon-wrap">
                           
                            <img  class="icon f-yellow" src="content/edit.svg" id=${ids.NOTE_BTN} ></img>
                          
                            <label for=${ids.NOTE_BTN}>NOTE</label>
                        </div>   
                        <div class="flex-col-c icon-wrap">
                            
                            <img class="icon f-yellow" src="content/question.svg" id=${ids.HINT_BTN} ></img>
                            
                            <label for=${ids.HINT_BTN}>HINT</label>  
                        </div>
                        <div class="flex-col-c icon-wrap">
                             <img class="icon f-yellow" src="content/idea.svg" id=${ids.SOLUTION_BTN}></img>
                             <label for=${ids.SOLUTION_BTN}>SOLVE</label>
                        </div>
                    
                   
                        <div class="flex-col-c icon-wrap">
                            <img class="icon f-yellow" src="content/undo.svg" id=${ids.UNDO_BTN}></img>
                            <label for=${ids.UNDO_BTN}>UNDO</label> 
                        </div>
                        <div class="flex-col-c icon-wrap">
                            <img class="icon f-yellow" src="content/redo.svg" id=${ids.REDO_BTN}></img>
                            <label for=${ids.REDO_BTN}>REDO</label>
                        </div>
                        <div class="flex-col-c icon-wrap">
                            <img class="icon f-yellow" src="content/reset.svg" id=${ids.RESET_BTN}></img>
                            <label for=${ids.RESET_BTN}>RESET</label>
                        </div>
                  
                   `
    el.id = ids.MAIN_CONTROLS;
    el.onclick = boardControls;
    el.className = 'ctrl-wrap grid-4';
   
    return el;
}