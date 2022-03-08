const express = require('express');
const { google } = require('googleapis');
const app = express();

app.get('/', async(req, res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();

    //create client instance for auth

    //instance of google sheets API
    const googleSheet = google.sheets({ version: "v4", auth: client });

    //Get metadata about spreadsheet
    var spreadsheetId = '1yLcQAA0j7ZJ5FQuiI2OtBpuWhf3y0ApnGAf4CqTTCmU';
    const metadata = await googleSheet.spreadsheets.get({
        auth,
        spreadsheetId
    });

    const getRows = await googleSheet.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: 'contact!A:B',
    });
    //insert row
    await googleSheet.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: 'contact!A:B',
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                ["test", "fad"],
                ["test", "junaid"]
            ]
        }
    });

    // await googleSheet.spreadsheets.values.update({
    //     auth,
    //     spreadsheetId,
    //     range: 'contact!A2:B7',
    //     valueInputOption: "USER_ENTERED",
    //     resource: {
    //         values: [
    //             ["junaid", "2244"]
    //         ]
    //     }
    // });


    //https://youtu.be/PFJNJQCU_lo
    //https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get?apix_params=%7B%22spreadsheetId%22%3A%221ycuqmrl46iA8RssPaBd9knKHaSQNljMkY79S7KxK61U%22%2C%22range%22%3A%22a2%22%7D
    res.json(getRows);
})

app.listen(1337, (req, res) => console.log('running on 1337'));