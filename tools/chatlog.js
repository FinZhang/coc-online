// chat log highlight
// online version

window.CLH = window.CLH || {};

// ====== public setting start ======

// merge continuous messages like pc qq
CLH.MERGE_CONTINUOUS_MESSAGES = true;

// to identify users
CLH.USER_NICKS = [];

// use for user leave someplace blank 
CLH.INVALID_USER_NICK = "InvalidUserNick_654378905724936750";

// ====== public setting  end  ======

CLH.convert = function(raw) {
    // output data
    let output = ['<div class="chat-log">'];

    let isFirstBlock = true;        // is first 'chat-item' block?
    let lastSpokenUserNick = "";    // last spoken user's nick, for merge continous message
    let userIndex = -1;             // user's index, to add class of chat item
    raw.split("\n").forEach(line => {
        // determine whether meta line
        let arr = line.split(/\s+/);
        if (arr.length === 2 && (userIndex = CLH.USER_NICKS.indexOf(arr[0])) >= 0 && 
            arr[1].match(/\d:\d\d:\d\d$/)) {   // is meta line
            if (CLH.MERGE_CONTINUOUS_MESSAGES && lastSpokenUserNick === arr[0]) return; // merge
            lastSpokenUserNick = arr[0];
            if (!isFirstBlock) output.push('</div>');
            isFirstBlock = false;
            output.push('<div class="chat-item user-' + userIndex + '"><span class="meta">' + line + '</span>');
        } else {    // is content line
            output.push('<br><span class="content">' + line + "</span>");
        }
    });
    output.push('</div></div>');
    
    return output.join('');
}