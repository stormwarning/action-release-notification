"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github_1 = require("@actions/github");
const web_api_1 = require("@slack/web-api");
const slack_1 = require("./slack");
const stringify = (data) => JSON.stringify(data, undefined, 2);
const getRequired = (name) => core.getInput(name, { required: true });
function run() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let channel = getRequired('channel');
            let message = getRequired('message');
            let actions = JSON.parse(core.getInput('actions'));
            let token = process.env.SLACKBOT_TOKEN;
            let slack = new web_api_1.WebClient(token);
            if (!channel) {
                core.setFailed('You must provide a `channel`');
                return;
            }
            let args = {
                channel,
                text: message,
                blocks: [
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: message,
                        },
                    },
                ],
                mrkdwn: true,
            };
            let { ref } = github_1.context;
            let match = /(\d+.\d+.\d+-?[a-z.0-9]*)/.exec(ref);
            let version = match ? match[1] : null;
            if (version) {
                (_a = args.blocks) === null || _a === void 0 ? void 0 : _a.push({
                    type: 'context',
                    elements: [
                        {
                            type: 'mrkdwn',
                            text: `*🔖 ${version}*`,
                        },
                    ],
                });
            }
            if (actions) {
                let elements = actions.map(({ text, url }) => slack_1.buildActionButton({ text, url }));
                (_b = args.blocks) === null || _b === void 0 ? void 0 : _b.push({
                    type: 'actions',
                    elements,
                });
            }
            let response = yield slack.chat.postMessage(args);
            core.setOutput('slack-result', stringify(response));
        }
        catch (error) {
            core.setFailed(stringify(error));
        }
    });
}
exports.run = run;
run();
