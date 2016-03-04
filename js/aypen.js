function refreshCategory(category, nav)
{
    $('#nav_window').removeClass('active');
    $('#nav_door').removeClass('active');
    $('#nav_slidingdoor').removeClass('active');

    $(nav).addClass('active');

    $('#chooseCategory').val(category);
    $('#bereken-message').hide();
    refreshType();
    refreshOptions();
}

function refreshType()
{
    var ddType = [
        {
            text: "Kies type",
            value: "0",
            selected: true,
            description: "",
            imageSrc: ""
        }];

    var ddCategory = $('#chooseCategory').val();

    $.each(aypen_pi['product'], function(i, item) {

        if(item['category'] == ddCategory)
        {

            ddType.push({
                text: item['description'],
                value: i,
                selected: false,
                description: "",
                imageSrc: "/tool/img/" + i + ".gif"
            });
        }
    });


    $('#chooseType').ddslick("destroy");
    $("#chooseType").empty();
    $('#chooseType').ddslick({
        data: ddType,
        width: "100%",
        truncateDescription: false,
        selectText: "Kies type",
        imagePosition: "left",
        onSelected: function (selectedData) {
            $('#bereken-message').hide();
            refreshOptions();
        }
    });
}

function refreshOptions() {
    var ddProduct = $('#chooseType').data('ddslick').selectedData.value;

    $('#group-profile').hide();
    $('#group-aanslag').hide();

    //$('#group-kozijn-binnen').hide();
    //$('#group-draaideel-buiten').hide();
    //$('#group-draaideel-binnen').hide();

    $('.group-draaidelen').hide();

    $('#group-overig').hide();
    $('#group-glas').hide();
    $('#group-slot').hide();
    $('#group-slot-beslag').hide();

    if(ddProduct <= 0)
    {
        return;
    }

    var product = aypen_pi['product'][ddProduct];

    if(product['hasProfile'])
    {
        $('#group-profile').show();
        //$('#group-aanslag').show();
    }

    if(product['amountTurningPart'] > 0)
    {
        $('.group-draaidelen').show();
        $('#group-draaideel-buiten').show();
        $('#group-draaideel-binnen').show();
    }

    if(product['windowPart'] > 0)
    {
        $('#group-overig').show();
        $('#group-glas').show();
    }

    if(product['slotBeslagPart'] > 0)
    {
        $('#group-slot-beslag').show();
    }

    if(false && product['keyPart'] > 0)
    {
        $('#group-overig').show();
        $('#group-slot').show();
    }

}


function loadTool(apiUrl) {

    $('.info_rightside').hide();
    $.get(apiUrl + 'winkelwagen.php', function (data) {
        $('#cart').show().html('<p>' + data + '<p>');
    });


    var ddProfile = [
        {
            text: "Verdiept profiel",
            value: 1,
            selected: false,
            description: "Het kozijnsysteem GEALAN NL plus combineert de modernste profieltechnologie met de traditionele eisen van de Nederlandse markt. Zachte contouren en smalle aanzichtbreedtes leiden tot optisch evenwicht en bevallige proporties." +
            " Technisch blijft met het systeem GEALAN NL plus geen wens meer onvervuld. Bouwdiepte, kamervorming en zinvolle detailconstructies voldoen aan alle verwachtingen betreffende warmte- en geluidsisolatie, statica en inbraakpreventie. " +
            "Gelijktijdig bestaat een hoge compatibiliteit met andere GEALAN-systeemfamilies Overtuigende techniek. De vleugel-bouwdiepte van 74 mm in het systeem GEALAN NL plus en de beproefde vier-kamer-vorm staan garant voor een uitstekende warmte-isolatie. " +
            "Samen met functieglas kunnen zeer goede U-waarden worden bereikt. Ook de kadergeometrie is geoptimaliseerd. De stalen profielen liggen direct tegen de verstevigingkamers zodat er geen tussenruimtes ontstaan. Bovendien onderscheiden deze zich door duidelijk betere traagheidsmomenten. " +
            "De statische waarden van de vier-kamer-vleugelprofielen zijn in vergelijking met een vlak profiel bijna dubbel zo hoog. Zo kunnen probleemloos grote elementen worden gerealiseerd.",
            imageSrc: "/img/gealan/sys_nl_plus.jpg"
        },
        {
            text: "Vlak profiel",
            value: 2,
            selected: false,
            description: "Het profielsysteem S 8000 IQ beslaat de consequente marktoriëntering van GEALAN. Bij de constructie van dit aanslagdichtingsysteem met 74 mm bouwdiepte stonden efficiency en materiaaloptimalisatie centraal – voor de probleemloze en economische verwerking door vakkundigen.",
            imageSrc: "/img/gealan/s8000iq_01.jpg"
        }
    ];

    $('#chooseProfile').ddslick({
        data: ddProfile,
        width: "100%",
        truncateDescription: true,
        selectText: "Kies type profiel",
        imagePosition: "left",
        onSelected: function (selectedData) {
            $('#bereken-message').hide();
        }
    });

    var ddKozijntypeMateriaal = [
        {
            text: "Wit",
            value: 1,
            selected: false,
            description: "",
            imageSrc: ""
        },
        {
            text: "Creme",
            value: 2,
            selected: false,
            description: "",
            imageSrc: ""
        }
    ];

    $('#chooseKozijntypeMateriaalBuiten').ddslick({
        data: ddKozijntypeMateriaal,
        width: "100%",
        truncateDescription: false,
        selectText: "Kies kozijn materiaal type voor buitenkant",
        imagePosition: "left",
        onSelected: function (selectedData) {
            $('#bereken-message').hide();
        }
    });

    $('#chooseKozijntypeMateriaalBinnen').ddslick({
        data: ddKozijntypeMateriaal,
        width: "100%",
        truncateDescription: false,
        selectText: "Kies kozijn materiaal type voor binnenkant",
        imagePosition: "left",
        onSelected: function (selectedData) {
            $('#bereken-message').hide();
        }
    });

    var ddType = [
        {
            text: "Kies kozijn/deur/schuifpui",
            value: "0",
            selected: true,
            description: "",
            imageSrc: ""
        }];

    $('#chooseType').ddslick({
        data: ddType,
        width: "100%",
        truncateDescription: true,
        selectText: "Kies type",
        imagePosition: "left",
        onSelected: function (selectedData) {
            $('#bereken-message').hide();
        }
    });


    var ddKleur = [
        {
            text: "Ral 9010 wit glad",
            value: "Ral 9010 wit glad",
            selected: false,
            description: "",
            imageSrc: ""
        },
        {
            text: "Ral 9001 creme glad",
            value: "Ral 9001 creme glad",
            selected: false,
            description: "",
            imageSrc: ""
        },
        {
            text: "Ral 7001 grijs",
            value: "Ral 7001 grijs",
            selected: false,
            description: "",
            imageSrc: ""
        },
        {
            text: "Ral 6009 donkergroen",
            value: "Ral 6009 donkergroen",
            selected: false,
            description: "",
            imageSrc: ""
        },
        {
            text: "Ral 8022 zwart",
            value: "Ral 8022 zwart",
            selected: false,
            description: "",
            imageSrc: ""
        },
        {
            text: "Ral 3011 rood",
            value: "Ral 3011 rood",
            selected: false,
            description: "",
            imageSrc: ""
        },
        {
            text: "Ral 9010 wit met houtnerf",
            value: "Ral 9010 wit met houtnerf",
            selected: false,
            description: "",
            imageSrc: ""
        },
        {
            text: "Ral 9001 creme met houtnerf",
            value: "Ral 9001 creme met houtnerf",
            selected: false,
            description: "",
            imageSrc: ""
        },
        {
            text: "Ral 7016 antraciet",
            value: "Ral 7016 antraciet",
            selected: false,
            description: "",
            imageSrc: ""
        },
        {
            text: "Ral 5011 staalblauw",
            value: "Ral 5011 staalblauw",
            selected: false,
            description: "",
            imageSrc: ""
        },
        {
            text: "Ral 7035 licht-grijs",
            value: "Ral 7035 licht-grijs",
            selected: false,
            description: "",
            imageSrc: ""
        },
        {
            text: "Overige kleur",
            value: "Overige kleur, nog te bepalen",
            selected: false,
            description: "",
            imageSrc: ""
        }
    ];

    $('#chooseFrameBuiten').ddslick({
        data: ddKleur,
        width: "100%",
        truncateDescription: false,
        selectText: "Kies kleur",
        imagePosition: "left",
        onSelected: function (selectedData) {
            $('#bereken-message').hide();
        }
    });
    $('#chooseFrameBinnen').ddslick({
        data: ddKleur,
        width: "100%",
        truncateDescription: false,
        selectText: "Kies kleur",
        imagePosition: "left",
        onSelected: function (selectedData) {
            $('#bereken-message').hide();
        }
    });
    $('#chooseDraaideelBuiten').ddslick({
        data: ddKleur,
        width: "100%",
        truncateDescription: false,
        selectText: "Kies kleur",
        imagePosition: "left",
        onSelected: function (selectedData) {
            $('#bereken-message').hide();
        }
    });
    $('#chooseDraaideelBinnen').ddslick({
        data: ddKleur,
        width: "100%",
        truncateDescription: false,
        selectText: "Kies kleur",
        imagePosition: "left",
        onSelected: function (selectedData) {
            $('#bereken-message').hide();
        }
    });



    var ddAanslag = [
        {
            text: "Zonder aanslag",
            value: "1",
            selected: false,
            description: "",
            imageSrc: ""
        },
        {
            text: "Met aanslag",
            value: "2",
            selected: false,
            description: "",
            imageSrc: ""
        }
    ];

    $('#chooseAanslag').ddslick({
        data: ddAanslag,
        width: "100%",
        truncateDescription: false,
        selectText: "Kies aanslag type",
        imagePosition: "left",
        onSelected: function (selectedData) {
            $('#bereken-message').hide();
        }
    });

    var ddGlasType = [
        {
            text: "Standaard 4-16-4",
            value: "1",
            selected: false,
            description: "",
            imageSrc: ""
        },
        {
            text: "Chinchila",
            value: "2",
            selected: false,
            description: "",
            imageSrc: "/tool/img/glas_chinchila.jpg"
        },
        {
            text: "Crepi",
            value: "3",
            selected: false,
            description: "",
            imageSrc: "/tool/img/glas_crepi.jpg"
        },
        {
            text: "Mat glas",
            value: "4",
            selected: false,
            description: "",
            imageSrc: "/tool/img/glas_mat.jpg"
        },
        {
            text: "33,1-14-4 - Veiligheidglas aan de buitenkant",
            value: "5",
            selected: false,
            description: "",
            imageSrc: ""
        }
        ,
        {
            text: "33,1-14-33,1 Veiligheidglas aan de buitenkant en binnenkant",
            value: "6",
            selected: false,
            description: "",
            imageSrc: ""
        }
    ];

    $('#chooseGlas').ddslick({
        data: ddGlasType,
        width: "100%",
        truncateDescription: false,
        selectText: "Kies glas type",
        imagePosition: "left",
        onSelected: function (selectedData) {
            $('#bereken-message').hide();
        }
    });

    var ddSlotType = [
        {
            text: "Zonder sleutel",
            value: "1",
            selected: false,
            description: "",
            imageSrc: ""
        },
        {
            text: "Met sleutel",
            value: "2",
            selected: false,
            description: "",
            imageSrc: ""
        }
    ];

    $('#chooseSlot').ddslick({
        data: ddSlotType,
        width: "100%",
        truncateDescription: false,
        selectText: "Kies met / zonder sleutel",
        imagePosition: "left",
        onSelected: function (selectedData) {
            $('#bereken-message').hide();
        }
    });
    var ddSlotBeslagType = [
        {
            text: "Standaard veiligheidsbeslag",
            value: "1",
            selected: false,
            description: "",
            imageSrc: ""
        },
        {
            text: "Veiligheidsbeslag SKG klasse 2",
            value: "2",
            selected: false,
            description: "",
            imageSrc: ""
        }
    ];

    $('#chooseSlotBeslag').ddslick({
        data: ddSlotBeslagType,
        width: "100%",
        truncateDescription: false,
        selectText: "Kies veiligheidsbeslag",
        imagePosition: "left",
        onSelected: function (selectedData) {
            $('#bereken-message').hide();
        }
    });

    var ddQuantity = [
        {
            text: "1",
            value: "1",
            selected: true,
            description: "",
            imageSrc: ""
        },
        {
            text: "2",
            value: "2",
            selected: false,
            description: "",
            imageSrc: ""
        },
        {
            text: "3",
            value: "3",
            selected: false,
            description: "",
            imageSrc: ""
        },
        {
            text: "4",
            value: "4",
            selected: false,
            description: "",
            imageSrc: ""
        }
        ,
        {
            text: "5",
            value: "5",
            selected: false,
            description: "",
            imageSrc: ""
        }
        ,
        {
            text: "6",
            value: "6",
            selected: false,
            description: "",
            imageSrc: ""
        }
        ,
        {
            text: "7",
            value: "7",
            selected: false,
            description: "",
            imageSrc: ""
        }
        ,
        {
            text: "8",
            value: "8",
            selected: false,
            description: "",
            imageSrc: ""
        },
        {
            text: "9",
            value: "9",
            selected: false,
            description: "",
            imageSrc: ""
        }
        ,
        {
            text: "10",
            value: "10",
            selected: false,
            description: "",
            imageSrc: ""
        }
    ];

    $('#chooseQuantity').ddslick({
        data: ddQuantity,
        width: "100%",
        truncateDescription: false,
        selectText: "Kies aantal",
        imagePosition: "left",
        onSelected: function (selectedData) {

        }
    });

    $('#bereken-form').on("submit", function (event) {

        event.preventDefault();


        $('#chooseCategory>.dd-select>.dd-selected-value').attr('name', 'categorie');
        $('#chooseCategory>.dd-select>.dd-selected-value').attr('id', 'categorie');

        $('#chooseType>.dd-select>.dd-selected-value').attr('name', 'type');
        $('#chooseType>.dd-select>.dd-selected-value').attr('id', 'type');

        $('#chooseProfile>.dd-select>.dd-selected-value').attr('name', 'profile');
        $('#chooseProfile>.dd-select>.dd-selected-value').attr('id', 'profile');

        $('#chooseAanslag>.dd-select>.dd-selected-value').attr('name', 'met_aanslag');
        $('#chooseAanslag>.dd-select>.dd-selected-value').attr('id', 'met_aanslag');

        $('#chooseFrameBuiten>.dd-select>.dd-selected-value').attr('name', 'frame_buiten');
        $('#chooseFrameBuiten>.dd-select>.dd-selected-value').attr('id', 'frame_buiten');

        $('#chooseFrameBinnen>.dd-select>.dd-selected-value').attr('name', 'frame_binnen');
        $('#chooseFrameBinnen>.dd-select>.dd-selected-value').attr('id', 'frame_binnen');

        $('#chooseDraaideelBuiten>.dd-select>.dd-selected-value').attr('name', 'draaideel_buiten');
        $('#chooseDraaideelBuiten>.dd-select>.dd-selected-value').attr('id', 'draaideel_buiten');

        $('#chooseDraaideelBinnen>.dd-select>.dd-selected-value').attr('name', 'draaideel_binnen');
        $('#chooseDraaideelBinnen>.dd-select>.dd-selected-value').attr('id', 'draaideel_binnen');

        $('#chooseGlas>.dd-select>.dd-selected-value').attr('name', 'glas_type');
        $('#chooseGlas>.dd-select>.dd-selected-value').attr('id', 'glas_type');

        $('#chooseSlot>.dd-select>.dd-selected-value').attr('name', 'kies_slot');
        $('#chooseSlot>.dd-select>.dd-selected-value').attr('id', 'kies_slot');

        $('#chooseSlotBeslag>.dd-select>.dd-selected-value').attr('name', 'kies_slot_beslag');
        $('#chooseSlotBeslag>.dd-select>.dd-selected-value').attr('id', 'kies_slot_beslag');

        $('#chooseQuantity>.dd-select>.dd-selected-value').attr('name', 'quantity');
        $('#chooseQuantity>.dd-select>.dd-selected-value').attr('id', 'quantity');

        $.post(apiUrl + 'berekenTool.php', $('#bereken-form').serialize() + "&" + $('.dd-selected-value').serialize(), function (data) {
            $('#bereken-message').show().html('<p>' + data + '</p>');
        });
        return false;
    });

    $('#bereken-message').on('click', '.add', function () {
        $.post(apiUrl + 'winkelwagen.php', {'id': this.id}, function (data) {
            location.reload();
        });
        return false;

    });

    $('#cart').on('click','.removeProduct', function(){
        $.ajax({
            url: apiUrl + 'winkelwagen.php',
            type: 'DELETE',
            headers: {'id': $(this).parent().attr("id")},
            success: function(result){
            }
        });
        $.get(apiUrl + 'winkelwagen.php', function (data) {
            $('#cart').show().html('<p>' + data + '<p>');
        });
    });

    $('#cart').on('click','.btn-offerte',function(e){
        e.preventDefault();
        $.post( apiUrl + 'offerteAanvraag.php',$('#offerte-form').serialize(),function(data){
            $('#mailInfoAypen').html('<p>' + data + '</p>');


        });
    });

    refreshOptions();
    refreshCategory('window', '#nav_window')
};