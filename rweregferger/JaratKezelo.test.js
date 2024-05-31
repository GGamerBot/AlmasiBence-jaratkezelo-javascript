const { describe, it, expect } = require('vitest');
const JaratKezelo = require('./JaratKezelo');

describe('JaratKezelo', () => {
    let jk;

    beforeEach(() => {
        jk = new JaratKezelo();
    });

    it('új járat hozzáadása', () => {
        jk.ujJarat('AB123', 'Budapest', 'London', '2024-06-01T12:00:00');
        expect(jk.jaratok['AB123']).toBeTruthy();
    });

    it('hibát dob duplikált járatszám esetén', () => {
        jk.ujJarat('AB123', 'Budapest', 'London', '2024-06-01T12:00:00');
        expect(() => jk.ujJarat('AB123', 'Budapest', 'London', '2024-06-01T12:00:00')).toThrow('A járatszámnak egyedinek kell lennie!');
    });

    it('késés hozzáadása egy járathoz', () => {
        jk.ujJarat('AB123', 'Budapest', 'London', '2024-06-01T12:00:00');
        jk.keses('AB123', 30);
        expect(jk.jaratok['AB123'].keses).toBe(30);
    });

    it('hibát dob nem létező járat esetén', () => {
        expect(() => jk.keses('NONEXISTENT', 30)).toThrow('Nem létező járat!');
    });

    it('nem engedi a negatív összesített késést', () => {
        jk.ujJarat('AB123', 'Budapest', 'London', '2024-06-01T12:00:00');
        jk.keses('AB123', -10);
        expect(jk.jaratok['AB123'].keses).toBe(0);
        expect(() => jk.keses('AB123', -10)).toThrow('NegativKesesException');
    });

    it('tényleges indulási idő visszaadása', () => {
        jk.ujJarat('AB123', 'Budapest', 'London', '2024-06-01T12:00:00');
        jk.keses('AB123', 60);
        const tenylegesIndulas = jk.mikorIndul('AB123');
        expect(tenylegesIndulas).toEqual(new Date('2024-06-01T13:00:00'));
    });

    it('járatok visszaadása egy adott reptérről', () => {
        jk.ujJarat('AB123', 'Budapest', 'London', '2024-06-01T12:00:00');
        jk.ujJarat('CD456', 'Budapest', 'Párizs', '2024-06-01T14:00:00');
        jk.ujJarat('EF789', 'Berlin', 'London', '2024-06-01T16:00:00');
        const budapestiJaratok = jk.jaratokRepuloterrol('Budapest');
        expect(budapestiJaratok).toEqual(['AB123', 'CD456']);
    });
});
