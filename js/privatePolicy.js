/**
 * this function creates the impressum screen
 */
function privatePolicyScreen(){
    sdoc('showScreenText').innerHTML = /*html*/`
        <h1>Daten&shy;schutz&shy;erklärung</h1>
        <h2>I. Informationen über die Verarbeitung Ihrer Daten gemäß Art. 13 der Datenschutz-Grund&shy;verordnung (DS-GVO)
        </h2>
        <h2>1. Verantwortlicher und Datenschutz&shy;beauftragter<br>Verantwortlich für diese Website ist</h2>

        <p>Sven Plankenbichler.<br>
            Den Daten&shy;schutz&shy;beauftragten erreichen Sie per E-Mail unter<br>
            <a href="mailto:sven.friedrich88@online.de">sven.friedrich88@online.de</a><br>
            oder über die Adresse<br>
            Behringstraße 34, 01159 Dresden.</p>
        <h2>2. Daten, die für die Bereitstellung der Website und die Erstellung der Protokolldateien verarbeitet werden</h2>
        <br>
        <h3>a. Welche Daten werden für welchen Zweck verarbeitet?</h3>
        <br>
        <p>Bei jedem Zugriff auf Inhalte der Website werden vorübergehend Daten gespeichert, die möglicherweise eine
            Identifizierung zulassen. Die folgenden Daten werden hierbei erhoben:<br><br>

            - Datum und Uhrzeit des Zugriffs<br><br>

            - IP-Adresse<br><br>

            - Hostname des zugreifenden Rechners<br><br>

            - Website, von der aus die Website aufgerufen wurde<br><br>

            - Websites, die über die Website aufgerufen werden<br><br>

            - Besuchte Seite auf unserer Website<br><br>

            - Meldung, ob der Abruf erfolgreich war<br><br>

            - Übertragene Datenmenge<br><br>

            - Informationen über den Browsertyp und die verwendete Version<br><br>

            - Betriebssystem<br><br>

            Die vorübergehende Speicherung der Daten ist für den Ablauf eines Websitebesuchs erforderlich, um eine
            Auslieferung der Website zu ermöglichen. Eine weitere Speicherung in Protokolldateien erfolgt, um die
            Funktionsfähigkeit der Website und die Sicherheit der informations&shy;technischen Systeme sicherzustellen. In
            diesen Zwecken liegt auch unser berechtigtes Interesse an der Datenverarbeitung.</p>
            <br>
        <h3>b. Auf welcher Rechtsgrundlage werden diese Daten verarbeitet?</h3>
        <br>
        <p>Die Daten werden auf der Grundlage des Art. 6 Abs. 1 Buchstabe f DS-GVO verarbeitet.</p>
        <br>
        <h3>c. [Bei Bedarf] Gibt es neben dem Verantwortlichen weitere Empfänger der personen&shy;bezogenen Daten?</h3>
        <br>
        <p>Die Website wird bei [Name, Postadresse, E-Mail-Adresse des Hosters] gehostet. Der Hoster empfängt die oben
            genannten Daten als Auftragsverarbeiter.</p>
            <br>
        <h3>d. Wie lange werden die Daten gespeichert?</h3>
        <br>
        <p>Die Daten werden gelöscht, sobald sie für die Erreichung des Zwecks ihrer Erhebung nicht mehr erforderlich
            sind. Bei der Bereitstellung der Website ist dies der Fall, wenn die jeweilige Sitzung beendet ist. Die
            Protokolldateien werden […, maximal bis zu 24 Stunden] direkt und ausschließlich für Administratoren
            zugänglich aufbewahrt. Danach sind sie nur noch indirekt über die Rekonstruktion von Sicherungsbändern
            verfügbar und werden nach […, maximal vier Wochen] endgültig gelöscht.</p>
            <br>
        <h2>3. Betroffenen&shy;rechte</h2>
        <br>
        <h3>a. Recht auf Auskunft</h3>
        <br>
        <p>Sie können Auskunft nach Art. 15 DS-GVO über Ihre personenbezogenen Daten verlangen, die wir verarbeiten.</p>
        <br>
        <h3>b. Recht auf Widerspruch:</h3>
        <br>
        <p>Sie haben ein Recht auf Widerspruch aus besonderen Gründen (siehe unter Punkt II).</p>
        <br>
        <h3>c. Recht auf Berichtigung</h3>
        <br>
        <p>Sollten die Sie betreffenden Angaben nicht (mehr) zutreffend sein, können Sie nach Art. 16 DS-GVO eine
            Berichtigung verlangen. Sollten Ihre Daten unvollständig sein, können Sie eine Vervollständigung verlangen.
        </p>
        <br>
        <h3>d. Recht auf Löschung</h3>
        <br>
        <p>Sie können nach Art. 17 DS-GVO die Löschung Ihrer personenbezogenen Daten verlangen.</p>
        <br>
        <h3>e. Recht auf Einschränkung der Verarbeitung</h3>
        <br>
        <p>Sie haben nach Art. 18 DS-GVO das Recht, eine Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu
            verlangen.</p>
            <br>
        <h3>f. Recht auf Beschwerde</h3>
        <br>
        <p>Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen Datenschutzrecht
            verstößt, haben Sie nach Ar. 77 Abs. 1 DS-GVO das Recht, sich bei einer Datenschutzaufsichtsbehörde eigener
            Wahl zu beschweren. Hierzu gehört auch die für den Verantwortlichen zuständige Datenschutzaufsichtsbehörde:
            Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen,
            <a href="https://www.ldi.nrw.de/kontakt/ihre-beschwerde">https://www.ldi.nrw.de/kontakt/ihre-beschwerde</a>.</p>
            <br>
        <h3>g. Recht auf Datenübertragbarkeit</h3>
        <br>
        <p>Für den Fall, dass die Voraussetzungen des Art. 20 Abs. 1 DS-GVO vorliegen, steht Ihnen das Recht zu, sich
            Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten,
            an sich oder an Dritte aushändigen zu lassen. Die Erfassung der Daten zur Bereitstellung der Website und die
            Speicherung der Protokolldateien sind für den Betrieb der Internetseite zwingend erforderlich. Sie beruhen
            daher nicht auf einer Einwilligung nach Art. 6 Abs. 1 Buchstabe a DS-GVO oder auf einem Vertrag nach Art. 6
            Abs. 1 Buchstabe b DS-GVO, sondern sind nach Art. 6 Abs. 1 Buchstabe f DS-GVO gerechtfertigt. Die
            Voraussetzungen des Art. 20 Abs. 1 DS-GVO sind demnach insoweit nicht erfüllt.</p>
            <br>
        <h2>II. Recht auf Widerspruch gemäß Art. 21 Abs. 1 DS-GVO</h2>
        <p>Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die
            Verarbeitung Ihrer personenbezogenen Daten, die aufgrund von Artikel 6 Abs. 1 Buchstabe f DS-GVO erfolgt,
            Widerspruch einzulegen. Der Verantwortliche verarbeitet die personenbezogenen Daten dann nicht mehr, es sei
            denn, er kann zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die die Interessen, Rechte und
            Freiheiten der betroffenen Person überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder
            Verteidigung von Rechtsansprüchen. Die Erfassung der Daten zur Bereitstellung der Website und die
            Speicherung der Protokolldateien sind für den Betrieb der Internetseite zwingend erforderlich.</p>
    `;
}