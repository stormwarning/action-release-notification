"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildActionButton(options) {
    let { text, url, value } = options;
    return {
        type: 'button',
        text: {
            type: 'plain_text',
            text,
            emoji: true,
        },
        url,
        value,
    };
}
exports.buildActionButton = buildActionButton;
