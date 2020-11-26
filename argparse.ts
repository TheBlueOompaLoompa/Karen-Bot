function seperateStrings( msg : string ) {
    const args = msg.split(' ');
    const output = [];

    let isString = false;
    let stringBuilder = "";

    for(let i = 1; i < args.length; i++) {
        if(args[i].charAt(0) === '"') {
            isString = true;
            stringBuilder = "";
        }

        if(isString) {
            stringBuilder += args[i].replaceAll('"', '');
            if(args[i].charAt(args[i].length - 1) !== '"') stringBuilder += ' ';
        }


        if(args[i].charAt(args[i].length - 1) === '"') {
            isString = false;
            output.push(stringBuilder);
        } else {
            if(!isString) output.push(args[i]);
        }
    }

    return output;
}

export default {
    parseArguments: function ( msg : string ) {
        const args = seperateStrings(msg);

        return args;
    }
}