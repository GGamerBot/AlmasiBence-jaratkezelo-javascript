class JaratKezelo {
    constructor() {
        this.jaratok = {};
    }

    ujJarat(jaratSzam, repterHonnan, repterHova, indulas) {
        if (this.jaratok[jaratSzam]) {
            throw new Error('A járatszámnak egyedinek kell lennie!');
        }
        this.jaratok[jaratSzam] = {
            repterHonnan,
            repterHova,
            indulas: new Date(indulas),
            keses: 0
        };
    }

    keses(jaratSzam, keses) {
        const jarat = this.jaratok[jaratSzam];
        if (!jarat) {
            throw new Error('Nem létező járat!');
        }

        jarat.keses += keses;
        if (jarat.keses < 0) {
            jarat.keses = 0;
            throw new Error('NegativKesesException');
        }
    }

    mikorIndul(jaratSzam) {
        const jarat = this.jaratok[jaratSzam];
        if (!jarat) {
            throw new Error('Nem létező járat!');
        }

        return new Date(jarat.indulas.getTime() + jarat.keses * 60000);
    }

    jaratokRepuloterrol(repter) {
        return Object.keys(this.jaratok).filter(jaratSzam => this.jaratok[jaratSzam].repterHonnan === repter);
    }
}

module.exports = JaratKezelo;
