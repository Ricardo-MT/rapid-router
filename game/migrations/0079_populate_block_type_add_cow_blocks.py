# Generated by Django 3.2.15 on 2022-11-06 16:08

from django.db import migrations


class Migration(migrations.Migration):
    def block_types(apps, schema_editor):
        ACTION = 1
        CONDITION = 2
        PROCEDURE = 3
        CONTROLFLOW = 4

        block_types = {
            "move_forwards": ACTION,
            "turn_left": ACTION,
            "turn_right": ACTION,
            "turn_around": ACTION,
            "wait": ACTION,
            "deliver": ACTION,
            "sound_horn": ACTION,
            "controls_repeat": CONTROLFLOW,
            "controls_repeat_while": CONTROLFLOW,
            "controls_repeat_until": CONTROLFLOW,
            "controls_if": CONDITION,
            "logic_negate": CONDITION,
            "at_destination": CONDITION,
            "road_exists": CONDITION,
            "dead_end": CONDITION,
            "traffic_light": CONDITION,
            "cow_crossing": CONDITION,
            "call_proc": PROCEDURE,
            "declare_proc": PROCEDURE,
        }

        Block = apps.get_model("game", "Block")
        Block.objects.filter(type="puff_up").delete()
        Block.objects.filter(type="declare_event").delete()

        for block in Block.objects.all():
            block.block_type = block_types[block.type]
            block.save()
        Block.objects.create(type="cow_crossing", block_type=CONDITION)

    dependencies = [
        ("game", "0078_add_block_types"),
    ]

    operations = [
        migrations.RunPython(block_types),
    ]
