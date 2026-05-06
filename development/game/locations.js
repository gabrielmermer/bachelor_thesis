// locations.js    

function loadImages() {
    // TODO remove
    image_PLACEHOLDER = loadImage('assets/img/Z_placeholder.png');
    
    // images
    image_elevator = loadImage('assets/img/GLOBAL_elevator.png');

    // -1F
    image_minus1F_service_stairs = loadImage('assets/img/image_minus1F_service_stairs.png');
    image_minus1F_parking = loadImage('assets/img/image_minus1F_parking.png');
    image_minus1F_security_office = loadImage('assets/img/image_minus1F_security_office.png');
    image_minus1F_entrance = loadImage('assets/img/image_minus1F_entrance.png');
    image_minus1F_car_sport = loadImage('assets/img/image_minus1F_car_sport.png');
    image_minus1F_car_4x4 = loadImage('assets/img/image_minus1F_car_4x4.png');
    image_minus1F_exit_win = loadImage('assets/img/image_minus1F_exit_win.png');
   
    


    // 0F
    image_0F_entrance = loadImage('assets/img/0F_entrance.png');
    image_0F_storage = loadImage('assets/img/0F_storage.png');
    image_0F_clothes_shop = loadImage('assets/img/0F_clothes_store.png');
    image_0F_restaurant = loadImage('assets/img/0F_restaurant.png');
    image_0F_bubble_tea = loadImage('assets/img/0F_bubble_tea.png');
    image_0F_stairs = loadImage('assets/img/0F_stairs.png');
    image_0F_service_stairs = loadImage('assets/img/0F_service_stairs.png');
    image_0F_living_space = image_PLACEHOLDER
    image_0F_food_court = loadImage('assets/img/0F_food_court.png');
    image_0F_corridor = loadImage('assets/img/0F_corridor.png');

    // 1F
    
    image_1F_pharmacy = loadImage('assets/img/1F_pharmacy.png');
    image_1F_bathroom = loadImage('assets/img/1F_bathroom.png');
    image_1F_lounge = loadImage('assets/img/1F_lounge.png');
    image_1F_stairs = image_PLACEHOLDER
    image_1F_korean_store = loadImage('assets/img/1F_korean_store.png');
    image_1F_gun_store = loadImage('assets/img/1F_gun_store.png');
    image_1F_hidden_storage = loadImage('assets/img/1F_hidden_storage.png');
    image_1F_food_market = loadImage('assets/img/1F_food_market.png');
    image_1F_service_stairs = loadImage('assets/img/1F_service_stairs.png');

    // 2F
    image_2F_service_stairs = loadImage('assets/img/2F_service_stairs.png');
    image_2F_rooftop = loadImage('assets/img/2F_rooftop.png');
    image_2F_tent = loadImage('assets/img/2F_tent.png');
    image_2F_exit = loadImage('assets/img/2F_exit.png');
    image_2F_exit_win = loadImage('assets/img/2F_exit_win.png');
  
}


function initialiseLocations() {


  

    // locations -1F 


    game.locations.location_minus1F_elevator = new Place(
    "Elevator -1F",
    "Somehow the elevator still works. It must be running on some other power supply other than the rest of the building. You can see the parking just behind you",
    "-1F",
    image_elevator)

    game.locations.location_minus1F_service_stairs = new Place(
    "Service stairs -1F",
    "A stairway going upwards at least two floors. Sadly all of the doors on the other side seems to be in a need of a key.",
    "-1F",
    image_minus1F_service_stairs)

    game.locations.location_minus1F_parking = new Place(
    "Parking area",
    "A vast underground car park stretches out before you, the kind of space that was built to hold hundreds of vehicles but now feels like an abandoned cathedral. Most bays are empty, their painted lines fading into the grey concrete, each one a ghost of a car long since driven away. Oil stains spread across the floor in dark archipelagos, and the smell of old exhaust and damp stone hangs heavy in the recycled air. Concrete pillars march off in orderly rows under a ceiling fitted with strip lights, most of them dead, a few still flickering with a low, inconsistent hum that pulses every few seconds like a slow heartbeat. A dented security office sits in one corner, its reinforced glass window dark. Nearby, two cars remain — a battered sport car and a rugged 4x4 — both parked near the far wall as though their owners planned to return. The garage door leading outside is visible at the far end, a wall of corrugated metal separating this dead space from whatever waits beyond. On the wall near the parking entrance, a mounted panel catches your eye: it controls the building's elevator system. The casing is cracked, but the wiring behind it still looks intact. The right card might bring this whole thing back online.",
    "-1F",
    image_minus1F_parking)

    game.locations.location_minus1F_security_office = new Place(
    "Security Office",
    "A cramped room sits behind reinforced glass, the kind designed to make whoever's inside feel safer than they probably were. The monitors have been dead for a long time — their screens dull and coated in a thin film of dust that records every breath of air that has passed through here. A swivel chair lies tipped over beside the desk, one wheel still spinning faintly when disturbed, as though the person who knocked it over has only just left. Papers are scattered across the metal desk and the floor around it: shift rosters, incident logs, a half-completed crossword. Someone left in a real hurry. A coffee mug sits upright on the corner of the desk, its contents evaporated down to a dark ring of residue. The room smells of stale air and old electronics. On the floor near the desk, half tucked under the bottom shelf as though it rolled or was kicked there during the exit rush, sits a gun magazine — full, heavy, and easy to miss if you weren't looking carefully. You were. If you walk back the entrance door you you can go back to the main Parking area",
    "-1F",
    image_minus1F_security_office)

    game.locations.location_minus1F_entrance = new Place(
    "Garage door",
    "Garage door leading to the outside world. You can see the sunlight entering from above the ramp",
    "-1F",
    image_minus1F_entrance)

    game.locations.location_minus1F_car_sport = new Place(
    "Sport car",
    "A once-sleek sports car sits alone in its bay, the kind of vehicle that probably turned heads when it was new. Now the windows are smashed in on both sides, the glass spread across the seats and the concrete floor in a glittering mess that crunches under your feet even from a distance. The paint — some shade of deep blue that the dust has almost entirely buried — is scratched along both flanks,  The interior has been ransacked: the glove compartment hangs open and empty, the seat lining has been cut, and the centre console is ripped out entirely. Whatever was valuable has been taken. But the ransacking was hurried, and hurried people miss things. Wedged down beside the driver's seat, half hidden by the torn upholstery, is a rusty key — small, unremarkable, and intact. In the back of the car, pushed to the back as though stowed deliberately, sits a locked gasoline tank, its cap sealed so tightly that no amount of hand strength will open it. It's heavy — clearly full — and that makes it worth finding the right tool to crack it open. If you decide to exit the car you should be able to head out back to the main Parking area.",
    "-1F",
    image_minus1F_car_sport)

    game.locations.location_minus1F_car_4x4 = new Place(
    "4x4 car",
    "A stocky off-road vehicle occupies a wide bay near the back of the parking level, its bulk somehow reassuring compared to the stripped-out wreckage of the car nearby. The bodywork is dented and scratched — road damage, not vandalism — and a thick coat of dried mud still clings to the wheel arches from some journey it made before all of this. The windows are intact. The tyres look like they have air in them. The keys are sitting in the ignition, dangling from a plain ring with no fob, as if the driver stepped out for just a moment. You check the dashboard: the fuel gauge needle sits well below empty. The engine won't turn over without something in the tank. A canister port near the fuel cap accepts a standard nozzle, and the filler neck is unobstructed. Get some fuel in here and this thing might just be your way out — not an elegant exit, but a functional one. Whatever is beyond that garage door, this car is built to handle it. As you sit inside the car you know that you can turn around back to the Parking area",
    "-1F",
    image_minus1F_car_4x4)

    // 0F locations


    // location Ground Entrance 
    game.locations.location_0F_entrance_ground = new Place(
    "Ground Entrance",
    "A narrow maintenance shed sits tucked just off the ground entrance, wedged between the outer wall of the mall and the loading bay that was once used for stock deliveries. The space is cramped and close, with metal shelving lining both long walls and cardboard boxes collapsed from years of moisture and neglect, their contents long since turned to mulch. The smell is immediate and thick — rust and damp concrete and something organically wrong underneath it all. A single utility light is mounted to the ceiling on a rusted bracket, its bulb flickering in an uneven rhythm that throws the far corners of the shed in and out of shadow. Old cleaning equipment lines the back wall: mop heads, squeegees, a broken floor polisher with its cord knotted around its own body. Metal carts with seized wheels sit in a row, going nowhere. Footprints in the dust suggest someone has been here recently — more than once, by the look of it. You can see an entrance to a Clothing store in front of you, and also a small Storage shed to the right, just past the main doors.",
    "0F",
    image_0F_entrance) 

    // location Entrance Shed
    game.locations.location_0F_storage_shed = new Place(
    "Storage Shed",
    "A cramped utility storage room branches off from the entrance area, little more than a narrow rectangle lined with metal shelving that has partially collapsed under the slow weight of time and moisture. Cardboard boxes sit stacked in uneven towers, most of them softened and sagging where damp air has eaten through the bottom layers. Some have split open entirely, spilling warped packaging, cleaning supplies, and brittle paper labels onto the floor. The air smells strongly of wet cardboard and rusted metal. A few plastic crates are scattered around the room, one tipped on its side where someone clearly rummaged through it in a hurry. On the floor near that crate, half-buried under a torn plastic sheet, lies a heavy crowbar. Its metal surface is scratched and worn from years of use, but the shaft is still perfectly solid and the curved end looks more than capable of prying open something that doesn’t want to move. The room itself offers little else of value. Behind you lies the Main Entrance.",
    "0F",
    image_0F_storage)

    // location Clothes Store
    game.locations.location_0F_clothes_store = new Place(
    "Clothes Store",
    "You step into a clothes store that once occupied a prime corner of the ground floor, its broad shopfront now reduced to a bent shutter and dusty glass. Rows of empty clothing racks stretch across the floor in the formation they were left in, most of them stripped bare but a few still carrying single, abandoned garments — a coat on a wire hanger, a shirt still folded on a shelf above the fitting rooms. The lights are completely off, but dim daylight seeps in from the ground entrance nearby, bouncing off dusty floor-length mirrors that line the walls and giving the whole space a flat, washed-out quality. Torn price tags drift across the shelves, and piles of discarded hangers crunch underfoot like dead leaves. The air is stale, tinged with the faint chemical smell of old fabric and something softer beneath it — mildew, or just age. Changing rooms line the back wall, their curtains half torn and their doors slightly open, each one revealing a rectangle of deeper shadow. The corridor that links this store to the rest of the mall is blocked by a reinforced internal door — it's heavy, and the hinges are stiff, but a good crowbar worked into the frame should be enough to force it. Behind you lies the Ground entrance",
    "0F",
    image_0F_clothes_shop) 

    // location 0F corridor
    game.locations.location_0F_corridor = new Place(
    "Small Corridor",
    "A functional connecting passage that joins the Clothing store with something in the distance that looks like a Fishing store. On the right side of that there seems to be a huge opening in the distance, looking like a food court. You pause for a moment and take in the humid air. Behind you is the Clothing store.",
    "0F",
    image_0F_corridor) 

    // location food court
    game.locations.location_0F_food_court = new Place(
    "Food court",
    "A wide open space connecting many different places on the ground floor. You can feel how shocking it is since this space used to be so loud, yet now it's deafeanignly quiet. You take a long moment to look around yourself. At the very left there seems to be some kind of Elevator, door locked from the outside. More to the right there's a Restaurant and a Bubble Tea store. The Elevator was clearly not the only way of going up and down since you can spot stairs on the very right of the room. You can also see the main corridor that joins the fishing market and the food store",
    "0F",
    image_0F_food_court ) 

    // location living space
    game.locations.location_0F_living_space = new Place(
    "Fishing Store",
    "This place used to be a fishing store. Now it seems completely ruined. Whatever happened here there's alsmost no fishing supplies. A mattress on the floor indicaes that someone took refuge here for more than just a short second. Behind the shopping counter you can see heavy metal doors with the text Shaft, only for personel. The doors seem heavy and more improtantly locked. You can go behind you to get back to the corridor that joins this store, Foodcourt and the Clothing store.",
    "0F",
    image_0F_living_space ) 

    // location elevator 0F
    game.locations.location_0F_elevator = new Place(
    "Elevator 0F",
    "The elevator here seems to be somehow working. You wonder how would that be even possible - maybe some emergency power supply? Doesn't matter for now. You can see that you can travel to -1F, 0F and 1F or turn back and head to the Food Court",
    "0F",
    image_elevator)

    game.locations.location_0F_restaurant = new Place(
    "Greek Fast Food restaurant",
    "A fast-food counter runs the length of the back wall, its service hatches still open, its overhead menu board still showing laminated photographs of food that no longer exists anywhere in this building. The smell in here is complex and unpleasant — old grease baked into the walls, something gone wrong in the kitchen, and the sour sweetness of spilled drinks dried to a sticky film across the floor tiles. Stacked trays sit in a pile behind the counter, coated in the same grey dust that covers everything else. In the kitchen behind the hatch, you can see an overturned prep table and what looks like a fryer dragged out of position, its cable still trailing to a dead wall socket. Flies circle something in the back. Near the front counter, partly obscured by a fallen standing sign advertising a combo deal, a keycard lies flat on the tiles. It's a building worker's pass — plastic, chipped along one edge, but the magnetic strip looks intact. Behind you you can see the Food court", 
    "0F",
    image_0F_restaurant )

    game.locations.location_0F_bubble_tea = new Place(
    "Bubble Tea Store",
    "An airy corner kiosk, pastel-coloured and designed to feel cheerful, now completely gutted. The countertop dispensing machines have been smashed open, their internal mechanisms pulled out and left in a pile on the floor behind the counter, presumably by someone looking for parts or just looking to destroy something. Coloured syrup has dried on the counter surface in thick brown and purple streaks that run down the cabinet fronts and pool in the joins between the floor tiles. Hundreds of empty plastic cups crunch underfoot in every direction — they must have been knocked from a storage shelf at some point and never cleaned up. The branding on the walls — cheerful cartoon characters holding oversized drinks — has faded but not disappeared, the colour leaching slowly from the printed panels. There is nothing useful here. The store is a dead end, its only value being that it connects back to the food court and provides a brief detour from the weight of everything else. Sometimes a dead end is worth checking. This time, it isn't.",
    "0F",
    image_0F_bubble_tea )

    game.locations.location_0F_stairs = new Place(
    "Stairway going up",
    "A wide public staircase rises from the food court level toward the first floor above, its treads broad and shallow in the way that public-facing stairs always are — designed to carry crowds moving slowly with shopping bags, not people moving fast. The handrails are still solid, bolted through the wall on both sides without any significant play when you grip them. The steps themselves are mostly clear of debris, a few stray objects pushed to the edges by whoever came through here last. Faded arrows point upward on the wall above each landing, still directing shoppers to departments that no longer exist. The stairwell is enclosed on both sides by tiled walls, the acoustic effect making every footstep louder than it should be. Light filters down from a half-open fire door at the top. Below, the food court spreads out and the ways back to the rest of the ground floor are visible through the push-bar doors. It's a straightforward route — not hidden, not locked, just there, waiting to be used. You can see the that the stairs are only going up from here for what looks like 2 floors",
    "0F",
    image_0F_stairs ) 

    game.locations.location_0F_service_stairs = new Place(
    "Service stairs 0F",
    "A staff-only stairwell hides behind the heavy steel door in the Fishing store. Inside, the stairwell is purely functional: bare concrete walls, a single exposed conduit running vertically beside the stairs, light from a wire-caged bulb at each landing that somehow still works on whatever emergency circuit it was wired to. The air in here is still and cold in a way the rest of the building isn't, as if the shaft has been sealed for long enough to develop its own climate. The smell is damp and mineral. The route runs between three points: the fishing store on theground floor, the service level below connecting to the underground parking, and the first floor service corridor above. A door at each landing requires you to push hard — the frames have settled over time and nothing here fits properly anymore. This stairwell doesn't appear on the maps they gave to shoppers.",
    "0F",
    image_0F_service_stairs)

    // 1F locations
    game.locations.location_1F_elevator = new Place(
    "Elevator 1F",
    "It's the building elevator, somehow still working. You ponder on which keys to use. You can clearly see that it can go to -1F, 0F or 1F which you're at currently",
    "1F",
    image_elevator)


    game.locations.location_1F_pharmacy = new Place(
    "Pharmacy",
    "The pharmacy occupies a small storefront just off the lounge, its glass display counters mostly empty and coated in a dull film of dust. Whatever medicine and supplies were once kept here have long since been taken — either by desperate people passing through or by someone who knew exactly what to look for. The shelves behind the counter are almost bare, though faded labels still mark where painkillers, antiseptics, and cold remedies once sat in neat rows. A few cardboard boxes lie torn open on the floor near the back wall, their contents scattered and useless. The air smells faintly of disinfectant, the chemical scent clinging stubbornly to the tile even after everything else has disappeared. Near one of the overturned boxes you notice a leg stabiliser lying on the ground — the kind used to immobilise a broken limb until proper treatment is possible. It looks worn but intact, as though it was pulled from a medical kit and never used. The lounge is just outside behind you.",
    "1F",
    image_1F_pharmacy)

    game.locations.location_1F_bathroom = new Place(
    "Bathroom",
    "The first floor bathrooms are the cleanest space in the building, and that's a low bar to clear, but it's noticeable. The tiled floor is intact — no warping, no subsidence, no water damage beyond a thin discolouration near the drain channels. The mirrors above the sink basin are unbroken, and whatever they're reflecting right now looks exactly as bad as you feel. The sinks are dry — the water stopped running a long time ago, and the taps turn without producing anything. Soap dispensers are empty. Paper dispensers are empty. Hand dryers are dead. The cubicles are intact, their doors lockable, their walls scrawled with the usual variety of messages that accumulate in tiled rooms over time — some banal, some philosophical, a few legible as recent additions written in a different medium from the older ones. There is nothing useful here. The bathrooms connect back to the lounge and nowhere else. But they are clean, and they are quiet, and sometimes those two things are worth more than the alternatives.",
    "1F",
    image_1F_bathroom)

    game.locations.location_1F_lounge = new Place(
    "Lounge",
    "Big empty hallway with ample space and relaxing chairs connecting multiple stores. You can see the Pharmacy here with bathroom being right next to it. On the other side there seems to be a Korean snack store next to stairs that look like they're going down. In the distance you can also see an elevator and a big Food supermarket",
    "1F",
    image_1F_lounge)

    game.locations.location_1F_stairs = new Place(
    "Stairway going down",
    "A public stairwell descends from this landing back toward the floor below. The steps are wide and shallow, designed for the slow movement of crowds rather than quick escape, and each one echoes softly underfoot in the enclosed space. The tiled walls are stained with years of use, scuffed by bags and shoes and the slow erosion of time. Dust has collected along the edges of the steps where no one has walked in a long while, and the metal handrail feels cold and slightly rough beneath your grip. Faded directional signs still cling to the walls, pointing toward shops and departments that no longer exist. The air carries a faint smell of stale concrete and old air circulation. The stairs disappear downward into the darker level below, while behind you the open space of the Lounge remains visible.",
    "1F",
    image_0F_stairs)

    game.locations.location_1F_korean_store = new Place(
    "Korean snack store",
    "Shelves of bright, busy packaging line every wall, the colours still vivid in a building that has grown steadily greyer everywhere else — foil chip bags, boxed snacks, dried seaweed in stacked cellophane envelopes. Most of it is expired and has bloated slightly from internal gas, the packaging distended in a way that looks wrong. The smell of stale seaweed and old sweetness drifts through the space, not unpleasant but definitely off. The store connects through a short passage to the gun store next door and opens out the other way into the lounge. Built into the wall near the entrance is a shaft lock mechanism — the kind that takes a metal key — connected to the building's service access system. It looks like it's been tried before: scratches around the keyhole, faint drag marks on the plate.",
    "1F",
    image_1F_korean_store)

    game.locations.location_1F_gun_store = new Place(
    "Gun store",
    "The interior of the gun store is stark and quiet, the kind of space that was once tightly controlled and meticulously organised. Glass display cases run along the center of the room, most of them shattered or forced open, their interiors completely stripped of anything that once sat inside. Metal racks on the walls still show the outlines where rifles and shotguns were once mounted, each empty bracket marking the absence of something that someone decided they needed more than the next person. Boxes of ammunition once stored behind the counter are gone as well, leaving only torn packaging and scattered cardboard sleeves on the floor. Dust covers everything now, dulling the hard surfaces and muting the room into the same grey tone as the rest of the building. Among the wreckage, one pistol remains — overlooked somehow in the chaos that emptied the store. It rests near the back counter, small but unmistakable in shape. Behind you the doorway leads back into the Korean snack store.",
    "1F",
    image_1F_gun_store)

    game.locations.location_1F_hidden_storage = new Place(
    "Hidden storage room",
    "A small room sits behind a section of panelling in the service corridor that doesn't quite match the rest — a slightly different shade, slightly newer screws. It takes a deliberate look to find it. Inside: bare shelving brackets bolted to the walls, a few cardboard boxes crushed flat in one corner, and the remains of an emergency supply cache that was looted some time ago — torn-open packaging, empty water containers, a first aid kit stripped down to its plastic shell. But on the floor, coiled carefully and tied with a length of its own loose end, is a thick rope. Long, heavy, the kind wound from multiple braided strands and designed to take real load without fraying. Someone put it here. Someone thought it might be needed. It connects to the first floor service stairs and nowhere else — the hidden panel is the only entrance.",
    "1F",
    image_1F_hidden_storage)

    game.locations.location_1F_food_market = new Place(
    "Food supermarket",
    "The supermarket is one of the largest spaces on this floor, a wide grid of tall shelving units that once held a dense maze of food and household supplies. Now most of those shelves sit half-empty, their remaining contents scattered and picked through by whoever passed here before you. A few dented cans still stand in crooked rows, some packets of dry goods remain where they were dropped, and entire sections have been stripped clean down to bare metal racks. The tiled floor is littered with torn packaging and plastic wrapping that shifts softly underfoot when you move. The air smells faintly stale — old flour, cardboard, and the dry dust of a place that has been opened and abandoned too many times. Near the middle of the store, sitting on the floor beside one of the shelves, is your brother. He looks exhausted and pale, one leg stretched out awkwardly in front of him. Even from a distance the problem is obvious: the leg is badly broken, twisted in a way it shouldn't be. He’s conscious, but barely holding himself together. He needs help, and he’s not going anywhere without it. Behind you lies the Lounge.",
    "1F",
    image_1F_food_market)

    game.locations.location_1F_service_stairs = new Place(
    "Service stairs 1F",
    "The first floor section of the building's service stairwell continues the same aesthetic as below — concrete, conduit, wire-caged bulbs — but feels more used. Scuff marks on the walls at shoulder height suggest repeated passage. The handrail here has been gripped so many times that the paint is completely worn from the top surface, leaving bare metal that has gone slightly orange with shallow oxidation. The stairs run between three points: the hidden storage room, tucked behind a disguised panel just off the corridor; the floor below, continuing down to the ground level and the underground parking; and the stairs above, which climb toward the second floor service areas. A door at the Korean snack store level opens directly into that store, which is how the hidden room stays hidden — you'd have to know it was there to find it from the main corridor. The stairwell smells of cold concrete and effort.",
    "1F",
    image_1F_service_stairs)




    // 2F locations

    game.locations.location_2F_service_stairs = new Place(
    "Service stairs 2F",
    "The service stairwell emerges at the top of the building into a short landing that ends at a heavy reinforced door. This door is the problem. It's not locked in the conventional sense — the locking mechanism has failed or been damaged, jamming the door shut from the frame side in a way that keys and handles can't resolve. The frame itself has deformed slightly, perhaps from heat, the metal bowed just enough to press the door into its housing with too much force to push through. Something explosive, applied at the right point, would force the frame apart and let the door swing. A makeshift bomb — gasoline and a fuse — would do it cleanly. An armed pistol, fired at the locking point, might do it less cleanly. Either way, the rooftop is on the other side of that door, and this stairwell is the only route up to it. The stairs below connect back to the first floor service stairs. The landing is bare: concrete floor, no windows, a single dead bulb in a wire cage above the door.",
    "2F",
    image_2F_service_stairs)

    game.locations.location_2F_rooftop = new Place(
    "Rooftop",
    "You push through into open air and it hits you immediately — the first genuine outside you've experienced since entering the building. The roof is wide and flat, bordered by a low parapet wall with a rusted metal railing bolted along its top edge. The sky above is grey, or blue, or somewhere between the two, and the wind up here carries the smell of the city — exhaust, wet asphalt, something burning in the middle distance. It feels enormous after the corridors below. The roof surface is covered in the standard layered membrane of commercial flat roofing, cracked and blistered in places, with the joints between sections raised in low ridges that cross the space in parallel lines. Heat exchanger units and ventilation boxes are spaced across the roof in a grid, most of them dead and rusting, their casings pitted by weather. In the far corner, visible from the service stair entrance, a lone camping tent stands pitched between two ventilation boxes, its guy ropes tight and its entrance zipped shut. A short walk the other way leads to the edge of the roof and the railing overlooking the drop below. The Service stairs are the only way back down — and currently the only way up.",
    "2F",
    image_2F_rooftop)

    game.locations.location_2F_tent = new Place(
    "Tent",
    "A small camping tent occupies a sheltered corner of the rooftop, positioned deliberately between two ventilation box housings where it would be partially obscured from anyone looking across the roof from the stair entrance. The fabric is a faded olive green, patched in two places with a different-coloured material and taped along one seam with duct tape that has mostly held. The guy ropes are staked into drilled holes in the roof surface — someone was here long enough to bring a drill. The zip is shut. Inside, the tent is inhabited by a corpse — long dead, seated against the back wall with the posture of someone who sat down to rest and didn't get up again. Whatever they had on them has mostly decayed along with them: some items still identifiable by shape, others reduced to ambiguous organic material. The tent smells as you'd expect. Whatever this person knew about survival, or about this building, or about what's happening out there, died with them. The rooftop is just outside through the open end.",
    "2F",
    image_2F_tent)

    game.locations.location_2F_exit = new Place(
    "Edge of the rooftop",
    "The edge of the building is marked by a low parapet wall topped with a metal railing, bolted at intervals and still solid despite the rust that has worked its way into every joint and fitting. Standing here, you can see down — a long way down. The street below is visible: cracked pavement, abandoned vehicles, the debris of the world as it was left. It's survivable with the right equipment. Without it, it isn't. The railing is the right height to loop a rope over and feed it down the exterior wall. The building's facade below this point is textured — windowsills, utility conduit, surface detail enough to manage the descent if the rope holds and you move carefully. If your rope is long enough and secured properly, it becomes a viable exit — not a comfortable one, but a real one. If your brother is with you, he can manage it, slowly. Without him beside you, there's no point going anywhere at all. The rooftop is accessible from here, back through the open expanse of the roof.",
    "2F",
    image_2F_exit)

    game.locations.location_2F_exit_win = new Place(
    "Epilogue",
    "You've made it off the roof together. Your brother somehow managed to get there with you too. You survived another day.",
    "",
    image_2F_exit_win)

    game.locations.location_minus1F_exit_win = new Place(
    "Epilogue",
    "You've made if off in a car together. You managed to survive another day.",
    "",
    image_minus1F_exit_win)


    // connections -1F 
    game.locations.location_minus1F_elevator.connections = [game.locations.location_minus1F_parking, game.locations.location_0F_elevator];

    game.locations.location_minus1F_service_stairs.connections = [game.locations.location_0F_service_stairs, game.locations.location_minus1F_parking];

    game.locations.location_minus1F_parking.connections = [game.locations.location_minus1F_car_sport, game.locations.location_minus1F_car_4x4, game.locations.location_minus1F_security_office, game.locations.location_minus1F_entrance];

    game.locations.location_minus1F_car_sport.connections = [game.locations.location_minus1F_parking];

    game.locations.location_minus1F_car_4x4.connections = [game.locations.location_minus1F_parking];

    game.locations.location_minus1F_security_office.connections = [game.locations.location_minus1F_parking];


    // connections 0F

    game.locations.location_0F_entrance_ground.connections = [game.locations.location_0F_storage_shed, game.locations.location_0F_clothes_store];

    game.locations.location_0F_storage_shed.connections = [game.locations.location_0F_entrance_ground];
    game.locations.location_0F_clothes_store.connections = [game.locations.location_0F_entrance_ground];

    game.locations.location_0F_corridor.connections = [game.locations.location_0F_food_court, game.locations.location_0F_living_space];

    game.locations.location_0F_living_space.connections = [game.locations.location_0F_corridor];

    game.locations.location_0F_food_court.connections = [game.locations.location_0F_corridor, game.locations.location_0F_restaurant, game.locations.location_0F_bubble_tea, game.locations.location_0F_stairs];

    game.locations.location_0F_elevator.connections = [game.locations.location_0F_food_court];

    game.locations.location_0F_restaurant.connections = [game.locations.location_0F_food_court];

    game.locations.location_0F_bubble_tea.connections = [game.locations.location_0F_food_court];

    game.locations.location_0F_stairs.connections = [game.locations.location_1F_stairs, game.locations.location_0F_food_court]

    game.locations.location_0F_service_stairs.connections = [game.locations.location_0F_living_space, game.locations.location_1F_service_stairs, game.locations.location_minus1F_service_stairs]



    // connections 1F

    game.locations.location_1F_elevator.connections = [game.locations.location_0F_elevator, game.locations.location_1F_lounge];

    game.locations.location_1F_lounge.connections = [game.locations.location_1F_pharmacy, game.locations.location_1F_bathroom, game.locations.location_1F_stairs, game.locations.location_1F_korean_store, game.locations.location_1F_food_market];

    game.locations.location_1F_pharmacy.connections = [game.locations.location_1F_lounge];

    game.locations.location_1F_bathroom.connections = [game.locations.location_1F_lounge];

    game.locations.location_1F_korean_store.connections = [game.locations.location_1F_lounge, game.locations.location_1F_gun_store];

    game.locations.location_1F_gun_store.connections = [game.locations.location_1F_korean_store]; 

    game.locations.location_1F_food_market.connections = [game.locations.location_1F_lounge];

    game.locations.location_1F_stairs.connections = [game.locations.location_0F_stairs, game.locations.location_1F_lounge];

    game.locations.location_1F_service_stairs.connections = [game.locations.location_1F_hidden_storage, game.locations.location_0F_service_stairs, game.locations.location_1F_korean_store];

    game.locations.location_1F_hidden_storage.connections = [game.locations.location_1F_service_stairs];


    // connections 2F 
    game.locations.location_2F_service_stairs.connections = [game.locations.location_1F_service_stairs];

    game.locations.location_2F_rooftop.connections = [game.locations.location_2F_service_stairs, game.locations.location_2F_tent, game.locations.location_2F_exit];

    game.locations.location_2F_exit.connections = [game.locations.location_2F_rooftop];

    game.locations.location_2F_tent.connections = [game.locations.location_2F_rooftop];



    // -1F actions
    game.locations.location_minus1F_car_sport.actions = [pickUpKey, pickUpLockedGasolineTank];
    game.locations.location_minus1F_security_office.actions = [pickUpMagazine];


    // -1F item actions
    game.locations.location_minus1F_parking.itemActions = [openElevators];
    game.locations.location_minus1F_car_4x4.itemActions = [fuelCar];



    // 0F actions
    // game.locations.location_0F_entrance_ground.actions = [pickUpKey];
    game.locations.location_0F_storage_shed.actions = [pickUpCrowbar];

    game.locations.location_0F_clothes_store.itemActions = [openClothesDoor];

    game.locations.location_0F_restaurant.actions = [pickUpKeyCard];

    // 0F item actions
    game.locations.location_0F_living_space.itemActions = [openShafts];
    game.locations.location_0F_food_court.itemActions = [openElevators];


    // 1F actions
    game.locations.location_1F_pharmacy.actions = [pickUpLegStabiliser];
    game.locations.location_1F_hidden_storage.actions = [pickUpRope];
    game.locations.location_1F_gun_store.actions = [pickUpPistol];
    game.locations.location_1F_korean_store.actions = [pickUpMatchsticks];
    game.locations.location_1F_food_market.actions = [helpBrother];

    // 1F item actions
    game.locations.location_1F_korean_store.itemActions = [openShafts];
    game.locations.location_1F_food_market.itemActions = [fixBrotherLeg];

    // 2F actions

    // there is none atm

    // 2F item actions

    game.locations.location_2F_service_stairs.itemActions = [open2FDoor, open2FDoorGun];
    game.locations.location_2F_exit.itemActions = [throwRope];


    // todo rope exit

}
