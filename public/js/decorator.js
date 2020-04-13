function log(target) {
    target.prototype.logger = () => `${target.name}--- ${new Date().getTime()}---- 被调用`
}

function needLogin(target) {
    target.prototype.logger = () => `${target.name} 被调用`
}
module.exports = {log, needLogin};