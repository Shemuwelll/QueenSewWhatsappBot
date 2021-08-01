/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

// Komutları burada tutacağız.
var config = require('./config');
var Commands = [];

function newcmdaddtosew(info, func) {
    // Basit bir fonksiyon, komut eklemek için.
    var types = ['photo', 'image', 'text', 'message'];

    var infos = {
        fromSew: info['fromSew'] === undefined ? true : info['fromSew'], // Or Sudo
        onlyGrpSew: info['onlyGrpSew'] === undefined ? false : info['onlyGrpSew'],
        onlyPinned: info['onlyPinned'] === undefined ? false : info['onlyPinned'],
        onlyPm: info['onlyPm'] === undefined ? false : info['onlyPm'],
        delownsewcmd: info['delownsewcmd'] === undefined ? true : info['delownsewcmd'],
        desc: info['desc'] === undefined ? '' : info['desc'],
        usage: info['usage'] === undefined ? '' : info['usage'],
        dontAdCommandList: info['dontAdCommandList'] === undefined ? false : info['dontAdCommandList'],
        warn: info['warn'] === undefined ? '' : info['warn'],
        function: func
    };

    if (info['on'] === undefined && info['pattern'] === undefined) {
        infos.on = 'message';
        infos.fromSew = false;
    } else if (info['on'] !== undefined && types.includes(info['on'])) {
        infos.on = info['on'];

        if (info['pattern'] !== undefined) {
            infos.pattern = new RegExp((info['handler'] === undefined || info['handler'] === true ? config.HANDLERS : '') + info.pattern, (info['flags'] !== undefined ? info['flags'] : ''));
        }
    } else {
        infos.pattern = new RegExp((info['handler'] === undefined || info['handler'] === true ? config.HANDLERS : '') + info.pattern, (info['flags'] !== undefined ? info['flags'] : ''));
    }

    Commands.push(infos);
    return infos;
}

module.exports = {
    newcmdaddtosew: newcmdaddtosew,
    commands: Commands
}
