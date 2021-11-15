describe('replaceAll', () => {
    const originalMessage = 'Backbencher sits at the Back';

    const crossExpect = message => {
        const replacedMessage = 'Frontbencher sits at the Front';
        expect(message).toBe(replacedMessage);
    };

    describe('previous ES2022 version', () => {
        it('using a regex must replace all the charts matches', () => {
            const message = originalMessage.replace(/Back/g, 'Front');
            crossExpect(message);
        });
    });

    describe('after ES2022 version', () => {
        /**
         * @link https://262.ecma-international.org/12.0/#sec-string.prototype.replaceall
         */
        it('using a regex must replace all the charts matches', () => {
            const message = originalMessage.replaceAll('Back', 'Front');
            crossExpect(message);
        });
    });

});