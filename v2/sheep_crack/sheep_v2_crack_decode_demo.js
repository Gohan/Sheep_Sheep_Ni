// cd sheep_crack/ 
// vi sheep_v2_crack_decode_demo.js
const protobuf = require('protobufjs');

// 输入完成挑战时的MatchPlayInfo
const success_challenge_playinfo = "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"

protobuf.load("yang.proto", function(err, root) {
    if (err)
        throw err;

    // 获得 message 类型
    var MatchPlayInfo = root.lookupType("yang.MatchPlayInfo");
	var MatchStepInfo = root.lookupType("yang.MatchStepInfo");
    
    var _debase64 = Buffer.from(success_challenge_playinfo, 'base64');
	const message = MatchPlayInfo.decode(_debase64);
	console.log(message)
	console.log(message.stepInfoList[10])
});