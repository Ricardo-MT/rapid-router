$(document).ready(function () {
    var output = $('#consoleOutput');
    var outf = function (text) {
        output.text(output.text() + text);
    };
    
    var keymap = {
        "Ctrl-Enter" : function (editor) {
            Sk.configure({output: outf, read: builtinRead});
            //Sk.canvas = "mycanvas";
            Sk.pre = "consoleOutput";
            try {
                Sk.importMainWithBody("<stdin>", false, editor.getValue());
            } catch(e) {
                outf(e.toString() + "\n")
            }
        },
        "Shift-Enter": function (editor) {
            Sk.configure({output: outf, read: builtinRead});
            //Sk.canvas = "mycanvas";
            Sk.pre = "consoleOutput";
            try {
                Sk.importMainWithBody("<stdin>", false, editor.getSelection());
            } catch(e) {
                outf(e.toString() + "\n")
            }
        }
    }

    // set default code
    document.getElementById("code").value = "import van\nv = van.Van()";

    var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
        parserfile: ["parsepython.js"],
        autofocus: true,
        theme: "solarized dark",
        //path: "static/env/codemirror/js/",
        lineNumbers: true,
        textWrapping: false,
        indentUnit: 4,
        height: "160px",
        fontSize: "9pt",
        autoMatchParens: true,
        extraKeys: keymap,
        parserConfig: {'pythonVersion': 2, 'strictErrors': true}
    });



    $("#skulpt_run").click(function (e) { keymap["Ctrl-Enter"](editor)} );


    $('#clearConsole').click(function (e) {
        $('#consoleOutput').text('');
    });


    function builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
        return Sk.builtinFiles["files"][x];
    }

    editor.focus();
});