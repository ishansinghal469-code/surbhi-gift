from django.core.management.base import BaseCommand
from loveapi.models import TarotCard

class Command(BaseCommand):
    help = "Seed all 78 Tarot Cards"

    def handle(self, *args, **kwargs):

        cards = [

# ---------------- MAJOR ARCANA ----------------

{
"name":"The Fool",
"arcana":"Major",
"suit":"",
"meaning_upright":"New beginnings, innocence, freedom, adventure.",
"meaning_reversed":"Recklessness, foolishness, poor judgment."
},
{
"name":"The Magician",
"arcana":"Major",
"suit":"",
"meaning_upright":"Manifestation, confidence, power, action.",
"meaning_reversed":"Manipulation, deception, wasted talent."
},
{
"name":"The High Priestess",
"arcana":"Major",
"suit":"",
"meaning_upright":"Intuition, wisdom, mystery, inner voice.",
"meaning_reversed":"Secrets, confusion, ignoring intuition."
},
{
"name":"The Empress",
"arcana":"Major",
"suit":"",
"meaning_upright":"Love, abundance, fertility, nurturing.",
"meaning_reversed":"Dependence, emptiness, insecurity."
},
{
"name":"The Emperor",
"arcana":"Major",
"suit":"",
"meaning_upright":"Authority, structure, leadership.",
"meaning_reversed":"Domination, rigidity, stubbornness."
},
{
"name":"The Hierophant",
"arcana":"Major",
"suit":"",
"meaning_upright":"Tradition, learning, spiritual guidance.",
"meaning_reversed":"Rebellion, unconventional beliefs."
},
{
"name":"The Lovers",
"arcana":"Major",
"suit":"",
"meaning_upright":"Love, harmony, partnership.",
"meaning_reversed":"Conflict, imbalance, separation."
},
{
"name":"The Chariot",
"arcana":"Major",
"suit":"",
"meaning_upright":"Victory, determination, willpower.",
"meaning_reversed":"Lack of direction, aggression."
},
{
"name":"Strength",
"arcana":"Major",
"suit":"",
"meaning_upright":"Courage, patience, compassion.",
"meaning_reversed":"Fear, weakness, insecurity."
},
{
"name":"The Hermit",
"arcana":"Major",
"suit":"",
"meaning_upright":"Reflection, solitude, wisdom.",
"meaning_reversed":"Isolation, loneliness."
},
{
"name":"Wheel of Fortune",
"arcana":"Major",
"suit":"",
"meaning_upright":"Destiny, luck, cycles, change.",
"meaning_reversed":"Bad luck, setbacks."
},
{
"name":"Justice",
"arcana":"Major",
"suit":"",
"meaning_upright":"Fairness, truth, responsibility.",
"meaning_reversed":"Dishonesty, unfairness."
},
{
"name":"The Hanged Man",
"arcana":"Major",
"suit":"",
"meaning_upright":"Sacrifice, perspective, surrender.",
"meaning_reversed":"Delay, indecision."
},
{
"name":"Death",
"arcana":"Major",
"suit":"",
"meaning_upright":"Transformation, endings, rebirth.",
"meaning_reversed":"Resistance to change."
},
{
"name":"Temperance",
"arcana":"Major",
"suit":"",
"meaning_upright":"Balance, patience, moderation.",
"meaning_reversed":"Imbalance, excess."
},
{
"name":"The Devil",
"arcana":"Major",
"suit":"",
"meaning_upright":"Attachment, temptation, addiction.",
"meaning_reversed":"Freedom, release."
},
{
"name":"The Tower",
"arcana":"Major",
"suit":"",
"meaning_upright":"Sudden change, revelation.",
"meaning_reversed":"Avoiding disaster."
},
{
"name":"The Star",
"arcana":"Major",
"suit":"",
"meaning_upright":"Hope, inspiration, healing.",
"meaning_reversed":"Hopelessness, doubt."
},
{
"name":"The Moon",
"arcana":"Major",
"suit":"",
"meaning_upright":"Illusion, dreams, intuition.",
"meaning_reversed":"Confusion, fear."
},
{
"name":"The Sun",
"arcana":"Major",
"suit":"",
"meaning_upright":"Success, joy, positivity.",
"meaning_reversed":"Temporary sadness."
},
{
"name":"Judgement",
"arcana":"Major",
"suit":"",
"meaning_upright":"Awakening, reflection.",
"meaning_reversed":"Self doubt."
},
{
"name":"The World",
"arcana":"Major",
"suit":"",
"meaning_upright":"Completion, achievement.",
"meaning_reversed":"Unfinished business."
},
]

        suits = ["Cups", "Pentacles", "Swords", "Wands"]
        ranks = [
            "Ace","Two","Three","Four","Five","Six","Seven",
            "Eight","Nine","Ten","Page","Knight","Queen","King"
        ]

        for suit in suits:
            for rank in ranks:
                cards.append({
                    "name": f"{rank} of {suit}",
                    "arcana": "Minor",
                    "suit": suit,
                    "meaning_upright": f"Positive qualities of the {rank} of {suit}.",
                    "meaning_reversed": f"Challenges or blocked energy of the {rank} of {suit}."
                })

        created = 0

        for card in cards:
            obj, was_created = TarotCard.objects.get_or_create(
                name=card["name"],
                defaults=card
            )

            if was_created:
                created += 1

        self.stdout.write(
            self.style.SUCCESS(f"Successfully added {created} tarot cards.")
        )