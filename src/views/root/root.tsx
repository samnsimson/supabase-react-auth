import { Avatar, Button, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { CustomInput } from "../../component/ui";
import { supabase } from "../../db";
import { useAuth } from "../../hooks";

type Props = {};

export const RootView = (props: Props) => {
    const { signOut } = useAuth();
    const [countries, setCountries] = useState<any[]>([]);
    const [searchString, setSearchString] = useState("");

    const stringToColour = (str: string) => {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        var colour = "#";
        for (var i = 0; i < 3; i++) {
            var value = (hash >> (i * 8)) & 0xff;
            colour += ("00" + value.toString(16)).substr(-2);
        }
        return colour;
    };

    const fetchCountries = () => {
        supabase
            .from("countries")
            .select("*")
            .order("name")
            .then(({ data }) => setCountries(data ?? []));
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    return (
        <div className="bg-slate-100">
            <Button onClick={() => signOut()}>Sign out</Button>
            <Grid container direction="column" rowSpacing={2} className="max-w-xl mx-auto">
                <CustomInput
                    name="search"
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value.toLowerCase())}
                    placeholder="Search"
                    className="bg-white border-[1px] border-blue-600"
                />
                {countries
                    .filter((x) => x.name.toLowerCase().includes(searchString))
                    .map((country, key) => (
                        <Grid item key={key}>
                            <Paper className="flex gap-3 p-3 items-center shadow rounded-lg" elevation={0}>
                                <Avatar
                                    className="uppercase"
                                    sx={{
                                        backgroundColor: stringToColour(country.continent || ""),
                                        width: 64,
                                        height: 64,
                                    }}
                                >
                                    {country.iso2}
                                </Avatar>
                                <div>
                                    <h4 className="font-bold">
                                        Name: <span className="text-sky-700">{country.name}</span>
                                    </h4>
                                    <p>ISO Name: {country.iso3}</p>
                                    <p>Local Name: {country.local_name}</p>
                                    <p>Continent: {country.continent}</p>
                                </div>
                            </Paper>
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
};
