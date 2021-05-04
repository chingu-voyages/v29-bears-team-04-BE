"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSessionExpired = void 0;
const checkSessionExpired = (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({
            success: false,
            error: {
                field: "session",
                message: "Your session has expired, please login again."
            }
        });
    }
    ;
    return;
};
exports.checkSessionExpired = checkSessionExpired;
//# sourceMappingURL=checkSession.js.map