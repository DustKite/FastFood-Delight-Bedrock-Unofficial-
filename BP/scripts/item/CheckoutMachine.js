var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PlayerInteractWithEntityBeforeEvent, system, world } from "@minecraft/server";
import { methodEventSub } from "../lib/eventHelper";
import { ItemUtil } from "../lib/ItemUtil";
import { EntityUtil } from "../lib/EntityUtil";

export class CheckoutMachine {
    interact(args) {
        const itemStack = args.itemStack;
        if (!itemStack)
            return;
        const target = args.target;
        const player = args.player;
        if (!player.isSneaking) {
            return;
        }
        const inventory = player?.getComponent("inventory");
        const container = inventory?.container;
        if (itemStack.typeId === 'fastfooddelight:checkout_machine' && target.typeId === 'minecraft:villager_v2') {
            const variant = target.getComponent('minecraft:variant')?.value;
            const isBaby = target.getComponent('minecraft:is_baby');
            if (variant === 14 || isBaby) {
                return;
            }
            args.cancel = true;
            system.run(() => {
                const rotation = target.getRotation();
                if (EntityUtil.gameMode(player))
                    ItemUtil.clearItem(container, player.selectedSlotIndex);
                const dimension = target.dimension;
                const location = target.location;
                target.remove();
                const newEntity = dimension.spawnEntity('fastfooddelight:fast_food_waiter', location);
                newEntity.setRotation(rotation);
                newEntity.triggerEvent('fastfooddelight:become_villager');
            });
        }
    }
}
__decorate([
    methodEventSub(world.beforeEvents.playerInteractWithEntity),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PlayerInteractWithEntityBeforeEvent]),
    __metadata("design:returntype", void 0)
], CheckoutMachine.prototype, "interact", null);