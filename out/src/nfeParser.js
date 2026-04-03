"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNfeLine = parseNfeLine;
function parseNfeLine(line, cursorPosition) {
    const tagAtCursor = getTagAtPosition(line, cursorPosition);
    if (tagAtCursor) {
        return tagAtCursor;
    }
    const valueTag = getTagAroundValue(line, cursorPosition);
    if (valueTag) {
        return valueTag;
    }
    return null;
}
function getTagAtPosition(line, cursor) {
    let openAngle = -1;
    for (let i = cursor; i >= 0; i--) {
        if (line[i] === '<') {
            openAngle = i;
            break;
        }
        if (line[i] === '>')
            break; // cursor fora de qualquer tag
    }
    if (openAngle === -1)
        return null;
    let closeAngle = -1;
    for (let i = cursor; i < line.length; i++) {
        if (line[i] === '>') {
            closeAngle = i;
            break;
        }
    }
    if (closeAngle === -1)
        return null;
    const rawTag = line.slice(openAngle + 1, closeAngle).trim();
    if (!rawTag)
        return null;
    const isClosing = rawTag.startsWith('/');
    const tagBody = isClosing ? rawTag.slice(1) : rawTag;
    const tagName = tagBody.split(/[\s/]/)[0];
    if (!tagName || tagName.startsWith('?') || tagName.startsWith('!'))
        return null;
    return {
        tagName,
        tagValue: null,
        isClosingTag: isClosing,
        isBlock: false
    };
}
function getTagAroundValue(line, cursor) {
    // encontra abertura mais próxima antes do cursor
    let openStart = -1;
    for (let i = cursor; i >= 0; i--) {
        if (line[i] === '<') {
            if (line[i + 1] === '/')
                return null; // é fechamento
            openStart = i;
            break;
        }
        if (line[i] === '>')
            break;
    }
    if (openStart === -1)
        return null;
    // fim da tag de abertura
    let openEnd = -1;
    for (let i = openStart; i < line.length; i++) {
        if (line[i] === '>') {
            openEnd = i;
            break;
        }
    }
    if (openEnd === -1)
        return null;
    const tagContent = line.slice(openStart + 1, openEnd).trim();
    const tagName = tagContent.split(/[\s/]/)[0];
    if (!tagName)
        return null;
    // procura fechamento correspondente
    const closeTag = `</${tagName}>`;
    const closeIndex = line.indexOf(closeTag, openEnd);
    if (closeIndex === -1)
        return null;
    const contentStart = openEnd + 1;
    const contentEnd = closeIndex;
    // verifica se cursor está dentro do conteúdo
    if (cursor < contentStart || cursor > contentEnd)
        return null;
    const value = line.slice(contentStart, contentEnd).trim();
    return {
        tagName,
        tagValue: value || null,
        isClosingTag: false,
        isBlock: false
    };
}
//# sourceMappingURL=nfeParser.js.map