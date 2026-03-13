var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EntityHurtAfterEvent, world, ItemComponentTypes } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
import { ItemAPI } from "../lib/ItemAPI";

export class LootingRegister {
    looting(args) {
        const hurtEntity = args.hurtEntity;
        const damageSource = args.damageSource;
        if (!hurtEntity || !damageSource) return;
        const health = hurtEntity.getComponent('minecraft:health');
        if (!health?.currentValue && hurtEntity.typeId === 'fastfooddelight:fast_food_waiter') {
            const variant = hurtEntity.getComponent('minecraft:variant');
            if (variant && variant.value === 1) return;
            const damagingEntity = damageSource.damagingEntity;
            if (!damagingEntity) return;
            let lootingLevel = 0;
            const equipment = damagingEntity.getComponent('equippable');
            const inventory = damagingEntity.getComponent('inventory');
            let mainHandItem = null;
            if (equipment) {
                mainHandItem = equipment.getEquipment('Mainhand');
            } else if (inventory?.container) {
                mainHandItem = inventory.container.getItem(damagingEntity.selectedSlotIndex || 0);
            }
            if (mainHandItem) {
                const enchantable = mainHandItem.getComponent(ItemComponentTypes.Enchantable);
                if (enchantable) {
                    const lootingEnchantment = enchantable.getEnchantment('looting');
                    if (lootingEnchantment) {
                        lootingLevel = Math.min(lootingEnchantment.level, 3);
                    }
                }
            }
            const lootTableChance = lootingLevel > 0 ? (0.25 + (lootingLevel * 0.2)) : 0;
            const checkoutMachineChance = 0.05 + (lootingLevel * 0.025);
            const random = Math.random();
            if (random < lootTableChance) {
                hurtEntity.dimension.runCommand(`loot spawn ${hurtEntity.location.x} ${hurtEntity.location.y} ${hurtEntity.location.z} loot "entities/player_fast_food_waiter"`);
            }
            if (Math.random() < checkoutMachineChance) {
                ItemAPI.spawn(hurtEntity, 'fastfooddelight:checkout_machine', 1);
            }
        }
    }
}

__decorate([
    EventAPI.register(world.afterEvents.entityHurt),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EntityHurtAfterEvent]),
    __metadata("design:returntype", void 0)
], LootingRegister.prototype, "looting", null);