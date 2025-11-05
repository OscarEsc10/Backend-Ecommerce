"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const router = (0, express_1.Router)();
router.patch('/:id/role', users_controller_1.changeRole);
exports.default = router;
//# sourceMappingURL=users.routes.js.map