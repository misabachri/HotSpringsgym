# Instrukce – web Hot Springs Gym

## Situace
Jsi zkušený webový vývojář a designér s expertízou v tvorbě moderních, responzivních webových stránek. Tvým úkolem je vytvořit kompletní web podle specifikací níže.

Každá sekce webu má působit, jako by její návrh stál 20 tisíc korun. Web má působit prémiově, v souladu se značkou a jako hotový profesionální produkt.

Výsledný web nemá vypadat jako web vytvořený AI, vyvaruj se typickým grafickým prvkům.

## Cíl
Dodej uživateli kompletní, profesionální mobile-first webovou stránku, která je vizuálně atraktivní, funkční na všech zařízeních a připravená k okamžitému použití.

## Úkol
Vytvoř funkční web, který bude obsahovat:
- Strukturovaný komentovaný HTML5 kód s validní sémantikou
- Responzivní design (mobile-first přístup)
- CSS styly pro přizpůsobení všem obrazovkám (4K monitory, desktop, tablet, mobil)
- CSS jednotky velikosti: pro běžný text použij rem, pro nadpisy použij clamp
- Základní JavaScript pro interaktivitu (na jemné oživení stránek)

## Znalosti
- Zajisti rychlé načítání a optimalizovaný výkon
- Dodržuj best practices pro přístupnost (barevný kontrast, velikost písma, ARIA)
- Vlož favicon ve formátu svg (pokud ho nemáš dodaný, vytvoř ho)
- Pokud web produkuje marketingové a statistické cookies, vytvoř Cookie lištu, která bude obsahovat tlačítka Přijmout, Odmítnout a Nastavit. Vytvoř ji v barvách webu.
- Jako kanonickou (tj. preferovanou) URL webu chci hsgym.cz a web přesměruj z verze www na bez www (poznámka: můžete to chtít opačně, je to jedno)
- Přesměrování http→https je řešeno na úrovni hostingu, nedávej ho do souboru .htaccess

## Bezpečnost
- Vytvoř bezpečnostní hlavičku v .htaccess

## Práce s CSS
Při tvorbě webu vždy pracuj s CSS jako s design systémem, ne jako s náhodnými styly.

### 1. Struktura CSS
- Veškeré styly zapisuj výhradně do style.css.
- CSS musí být hlavní zdroj stylování pro celý web.
- Nepoužívej inline styly ani `<style>` bloky v HTML (výjimky jen s jasným zdůvodněním kritického CSS).

### 2. Povinný design systém (na začátku projektu)
Vytvoř v style.css základní systém proměnných:

**Barvy (CSS variables)** – definuj:
- primary
- secondary
- background
- text
- muted
- accent

**Spacing systém** – používej škálu např.:
- 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
- nikdy nevymýšlej náhodné hodnoty

**Typografie** – definuj:
- base font size
- h1–h6 hierarchii
- line-height pravidla
- používej konzistentní škálování (např. 1.25 ratio)

**Layout pravidla** – definuj:
- container max-width
- grid systém (např. 12 sloupců nebo flex systém)
- breakpointy (mobile-first)

### 3. Tvorba komponent
Každý prvek webu navrhuj jako komponentu:
- button
- navbar
- card
- form
- section
- hero

Každá komponenta musí:
- být znovupoužitelná
- nemít pevně zakódované hodnoty

### 4. CSS disciplína (velmi důležité)
- Nepiš jednorázové styly pro konkrétní HTML prvek.
- Nepoužívej nadměrnou specifitu (žádné zbytečné `!important`).
- CSS musí být škálovatelné pro budoucí rozšíření webu.

## Čisté URL (bez .html)
Vytvoř web s čistými URL (bez .html) a zároveň přidej serverovou pojistku pro staré odkazy.

**Pravidla pro frontend:**
- Všechny interní odkazy (href) generuj pouze jako čisté URL: `/sluzby`, `/kontakt`, `/o-mne`
- Nikdy nepoužívej .html v navigaci, tlačítkách, obsahu, sitemap ani canonical URL.

**Serverová pojistka:**
Vytvoř .htaccess s pravidly:
- 301 redirect všech .html URL na čisté URL
- interní rewrite čistých URL na odpovídající .html soubory (pokud existují)

## Základní SEO
- Strukturuj nadpisy H1–H6
- Přidej meta title a description na každé stránce
- Vytvoř strukturovaná data – LocalBusiness, FAQ, Article (pokud je to relevantní)
- Přidej do adresáře soubory sitemap.xml, robots.txt a llms.txt
- Obrázkům dej alt popisky
- Propoj stránky vnitřními odkazy
- Vytvoř Open Graph meta tagy (náhled webu pro Facebook a další sociální sítě)

## Optimalizace obrázků
- Přidej lazy loading ke všem obrázkům, které nejsou vidět hned při načtení stránky (below the fold). Tj. u hero sekce lazy loading nedělej.
- Obrázky dodám zkomprimované ve formátu jpg nebo png, ale kdyby se zdály velké, řekni si o formát avif.

## Vizuální hierarchie a čitelnost
- Jasná typografická hierarchie (nadpisy H1–H6, konzistentní velikosti)
- Dostatečný kontrast mezi textem a pozadím (minimum 4.5:1 pro běžný text)
- Čitelné fonty s českou diakritikou, minimální velikost 16px
- Správné řádkování (line-height 1.5–1.8 pro odstavce)
- Nikdy nezarovnávej text do bloku
- Maximální šířka textu 70 % obrazovky (nikdy nepiš od kraje po kraj)

## Layout
- Šířku celého webu dej na 90 % obrazovky
- Jasné oddělení sekcí a obsahových celků
- Pokud je v sekci 4 karty/boxy – dej je po dvou na řádek (ne 3+1)
- Vyvážené použití bílého prostoru (white space)
- Intuitivní navigace – logo vlevo, hamburger menu na mobilu vpravo
- Dej si záležet na patičce webu
- U prvku accordion (např. pro otázky a odpovědi) dávej ikonu šipky dolů a nahoru a pokud je jich víc než 3, tak je rozděl do dvou sloupců
- Jednopísmenové znaky (spojky, předložky) zalamuj na nový řádek
- Jednotky (Kč, m, kg, Eur, atd.) spoj s číslem nedělitelnou mezerou
- Datum piš ve formátu 1. 1. 2026 a mezery dej nedělitelné

## Obsah
- Stručné a srozumitelné texty
- Výrazné nadpisy s klíčovými informacemi a CTA tlačítka
- Vizuální prvky podporující obsah (ikony, obrázky, grafika)
- Logické uspořádání informací (nejdůležitější nahoře)
- Chybová stránka (místo „404" dej ikonu `<wa-icon name="face-frown" variant="regular"></wa-icon>`) a přidej ji na web pomocí příkazu v souboru .htaccess: `ErrorDocument 404 /404.html`
- Kontrola povinných údajů na webu: jméno, sídlo, IČ, zápis v rejstříku

## Konzistence
- Jednotný styl tlačítek, karet a komponent
- Stejný padding/margin napříč podobnými elementy
- Stejné zaoblení prvků
- Konzistentní ikonografie (používej Font Awesome, ne emotikony)
- Stíny karet pouze velmi jemné
- Jednotný projev značky (brand voice)
- Konzistentní použití barev napříč celým webem
- Jednotný spacing a odsazení (používej jednotný systém, např. 8px grid)

## Barevná paleta
- Omezený počet barev (2–3 hlavní + neutrální)
- Primární barva pro CTA (call-to-action) tlačítka
- Neutrální jemné barvy pro pozadí
- Pro text #333333

**Brand barvy (HEX):**
- primární: `#000000`, případně tmavá antracitová `#222327`
- sekundární: `#FFFFFF`
- tlačítka: `#D50032`
- pozadí: `#222327`, popř. pro ceník bílá
- text: `#000000`, případně `#121212`

## Fonty
- Zvol vhodný patkový nebo bezpatkový font podle obsahu webu
- Pokud není jasné, zvol moderní sans-serif font (např. Outfit)
- Brandový font Montserrat (nadpisový), obsahový Manrope

## Struktura
Web bude postaven na moderním industriálním fitness designu s tmavým antracitovým pozadím, výraznou bílou typografií, střídmými červenými akcenty a autentickými fotografiemi. Rozvržení bude minimalistické, vzdušné a přehledné, s důrazem na silnou vizuální hierarchii a dostatek prostoru mezi jednotlivými bloky.

Jedná se o jednostránkový web – položky menu budou Lekce, Ceník, Trenéři, Kontakt.

- **Hero sekce** – název Hot Springs Gym Karlovy Vary, krátké představení gymu jako jediného gymu v Karlových Varech zaměřeného na funkční fitness a výrazné CTA tlačítko pro rezervaci lekce.
- **Hodnotová sekce** – silné sdělení zaměřené na komunitu, individuální přístup a atmosféru gymu, které nahradí generické marketingové fráze.
- **Funkční fitness (CrossFit)** – tři sloupce s informacemi o tom, co funkční fitness je, pro koho je určeno a proč si vybrat právě tento gym.
- **Přehled lekcí** – asymetricky zpracovaný přehled čtyř lekcí (Cross, CrossMums, CrossKids, Vzpírání) s fotografiemi, krátkými popisky a navazujícím CTA pro rezervaci lekce.
- **Ceník** – světlá sekce s přehledným dvousloupcovým ceníkem obsahujícím první lekci zdarma, jednorázový vstup, permanentky na 10 a 20 vstupů včetně informace o tříměsíční platnosti permanentek.
- **Trenéři** – tmavá sekce, asymetrický layout nebo karusel s fotografií (zatím placeholdery), jménem, specializací, krátkým medailonkem a odkazy na sociální sítě.
- **Kontakt** – formulář (přes službu formspree.com, musí obsahovat honeypot), základní kontaktní údaje a patička obsahující logo, adresu, telefon, e-mail, navigaci a odkazy na Facebook a Instagram.

**Poznámka (SEO):** Gym není oficiálně licencovaným CrossFit® centrem, proto nesmí používat označení CrossFit jako součást názvu značky ani názvů služeb. Toto označení lze používat pouze v popiscích nebo v závorkách (např. Funkční fitness (CrossFit) nebo Cross (CrossFit)), aby bylo zachováno SEO a zároveň nebyla porušena pravidla používání ochranné známky.

Dodám screenshot bohužel jen tabletového zobrazení hero sekce a jedné části webu.

## Obrázky
Na webu použij fotky a obrázky, které najdeš ve složce Logo a Obrazky.
- **logo** – ve složce Logo si vyber odpovídající formát a barvu loga
- **hero** – hero_kompr, pak jednotlivé fotky pojmenované k jednotlivým lekcím
- **trenéři** – zatím použij placeholder

## Texty

### Hero
**HOT SPRINGS GYM KARLOVY VARY**
Jediný gym v Karlových Varech zaměřený na funkční fitness ("CrossFit").
Tlačítko: Rezervovat lekci

### Funkční fitness

**Co je crossfit nebo funkční fitness**
Jedná se o komplexní cvičení rozvíjející aerobní činnost a budování síly. Klade se důraz na naučení se správných pohybových vzorů jednotlivých cviků, což je důležité pro každodenní život. Každý trénink a cvik je maximálně variabilní a přizpůsobí se tak Vašim případným specifickým potřebám.

**Pro koho je určené**
Cvičit může naprosto kdokoliv – děti, dospívající, dospělí, senioři. Překážkou nejsou ani žádné pohybové indispozice – spíše naopak. Vhodné i pro úplné začátečníky.

**Proč u nás**
Lekce jsou vedené zkušenými trenéry, kteří dbají na individuální přístup a motivují k co nejlepším výkonům. Gym je tvořen skvělou komunitou lidí.

### Přehled lekcí

**Cross**
Síla, vytrvalost, tempo – crossfit trénink, který tě dostane do formy, připraví na život a bude tě bavit.

**CrossMoms**
Crossfitová lekce pro všechny ženy – těhotné, maminky po porodu, maminky s dětmi. V pohodovém tempu a s respektem k ženskému tělu.

**CrossKids**
Cvičení pro všechny děti ve věku od 8 do 14 let. Správné pohybové vzory a zlepšení kondice nenásilnou a hravou formou.

**Vzpírání**
Zatím nějaký text vymysli sám.

### Ceník
- první vstup zdarma
- jedna lekce 230 Kč
- 10 lekcí 1 700 Kč
- 20 lekcí 3 000 Kč

### Trenéři
- Tašny
- Zůza
- Jarka
- Dan
- Bublis

---

Vyjdi z dodaných textů, ale když budeš potřebovat, můžeš je mírně změnit nebo doplnit, zachovej vždy smysl a podstatu obsahu stránky.

Komunikace je přímá, sebevědomá a autentická. Nepoužívá přehnané motivační fráze ani klišé o překonávání limitů. Místo toho staví na důvěře, odbornosti trenérů a silné komunitě. Texty jsou stručné, srozumitelné a věcné, zároveň ale přátelské a povzbuzující. Cílem není návštěvníka přesvědčovat za každou cenu, ale dát mu pocit, že přichází mezi lidi, kteří ho podpoří bez ohledu na jeho aktuální výkonnost.
</content>
