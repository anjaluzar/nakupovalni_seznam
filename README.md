## Zapis stanja in izboljšav – CI/CD in Docker
### Stanje CI/CD cevovoda (Datadog CI Visibility)
<img width="829" height="460" alt="image" src="https://github.com/user-attachments/assets/2da29390-7ed1-425a-ab1d-4c86f85aa2de" />

Na podlagi podatkov iz nadzorne plošče Datadog CI Visibility je bilo ugotovljeno, da je bilo v zadnjem tednu izvedenih več zagonov CI/CD cevovoda, pri čemer je bila uspešnost izvajanja 100 %, kar pomeni, da so se vsi cevovodi zaključili brez napak. To kaže na stabilno in zanesljivo konfiguracijo cevovoda.

Analiza trajanja cevovodov kaže, da se čas izvajanja posameznih pipeline-ov giblje med približno 1,3 in 3,4 minute. Najpočasnejši je celotni CI-CD pipeline z median in P95 trajanjem 3,40 minute, kar pomeni, da večina zagonov traja podobno dolgo. Pipeline za teste in pokritost kode se izvaja pogosteje, vendar je hitrejši, z median vrednostjo okoli 1,35 minute.

Daljši čas izvajanja celotnega CI-CD pipeline-a je posledica dodatnih faz, kot so gradnja aplikacije, statična analiza kode in priprava artefaktov.

Izvedene optimizacije

Na podlagi analize so bile izvedene naslednje izboljšave:

- Uveden je bil cache za odvisnosti (npm cache), kar skrajša čas nameščanja paketov pri ponovnih zagonih.

- Testi in statična analiza (SonarCloud) se izvajajo sočasno, saj med seboj nista neposredno odvisna, kar zmanjša skupni čas izvajanja cevovoda.

- Deployment se izvaja pogojno, le ob uspešnem Quality Gate-u in na glavni veji, s čimer se preprečijo nepotrebni zagoni.

S tem se je izboljšala učinkovitost in hitrost CI/CD procesa.

### Varnostna analiza kode (CodeQL)
<img width="945" height="654" alt="image" src="https://github.com/user-attachments/assets/63aa0f5a-5cdf-4361-acbb-de89051313c0" />

V repozitoriju je bilo z analizo CodeQL zaznanih 13 odprtih varnostnih opozoril. Od tega so štiri opozorila visoke resnosti, ki se nanašajo na uporabo uporabniško nadzorovanih vhodov pri gradnji poizvedb v bazo podatkov, kar predstavlja tveganje za SQL injection, ter na manjkajoče omejevanje števila zahtevkov (rate limiting) na več API poteh, kar povečuje tveganje za zlorabe in napade zavrnitve storitve.

Preostalih devet opozoril srednje resnosti se nanaša na neustrezno nastavljene pravice v GitHub Actions workflowih, kjer niso eksplicitno omejene potrebne pravice za izvajanje CI/CD procesov, kar predstavlja potencialno varnostno tveganje v razvojnem procesu.

Najbolj nujni popravki so potrebni na strežniškem delu aplikacije, kjer je treba izboljšati varnost API-jev in dostopa do baze, medtem ko so popravki v CI/CD konfiguraciji priporočljivi za izboljšanje splošne varnostne higiene projekta.

### Varnostna analiza Docker slik (Snyk)
<img width="945" height="481" alt="image" src="https://github.com/user-attachments/assets/49684278-da90-4c02-9f0a-d19d87449de5" />
<img width="945" height="546" alt="image" src="https://github.com/user-attachments/assets/a7306fa2-3770-4a91-b3a5-e9ef75469533" />

Analiza Docker slik s pomočjo orodja Snyk je pokazala, da ima strežniški del aplikacije, ki temelji na osnovni sliki node:16-alpine, skupaj 30 ranljivosti, od tega osem visoke in enajst srednje resnosti. Ranljivosti izvirajo predvsem iz sistemskih paketov OpenSSL, musl libc in busybox, ki so v tej različici Alpine zastareli, vendar so že popravljeni v novejših izdajah.

Za odjemalski del aplikacije ranljivosti niso bile zaznane.

Priporočena je nadgradnja osnovne Docker slike za strežnik na novejšo različico (na primer node:25-alpine), s čimer bi se odpravile vse zaznane varnostne težave.
