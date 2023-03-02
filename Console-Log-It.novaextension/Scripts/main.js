// Do work when the extension is activated
exports.activate = function () {}

// Clean up state before the extension is deactivated
exports.deactivate = function () {}

// Invoked by the "Console.log It" command
nova.commands.register('console-log-it.logIt', editor => {
	// expand selections to word boundaries
	editor.selectWordsContainingCursors()
	// do all the changes as a single atomic change
	editor.edit(edit => {
		// grab all the selected ranges (support multiple cursors)
		editor.selectedRanges.reverse().forEach(range => {
			// select word to boundaries of current cursor
			const text = editor.getTextInRange(range)
			// grab range of whole line
			const lineRange = editor.getLineRangeForRange(range)
			// set new range based on the end of the line range
			const newRange = new Range(lineRange.end, lineRange.end)
			// TODO: figure out indentation
			// replace the new range with the console.log statement and a new line
			edit.replace(newRange, `console.log('${text}', ${text})\n`)
		})
	})
})
