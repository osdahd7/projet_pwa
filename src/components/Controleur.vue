<template>
    <v-container class="grey lighten-5">
        <v-row
                no-gutters
                style="height: 150px;"
        >
            <v-col
                    v-for="align in alignments"
                    :key="align"
                    :align-self="align"
            >
                <v-card
                        class="pa-2"
                        outlined
                        tile
                >
                    One of three columns
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>

</script>
