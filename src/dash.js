'use strict';

const { St, Shell, Meta } = imports.gi;
const Main = imports.ui.main;

const Me = imports.misc.extensionUtils.getCurrentExtension();


var DashBlur = class DashBlur {
    constructor(connections, prefs) {
        this.connections = connections;
        this.prefs = prefs;
        this.enabled = false;
    }

    enable() {
        this._log("blurring dash");

        this.update();
        this.enabled = true;
    }

    update() {
        if (Main.overview.dash.constructor.name == "Dash") {
            Main.overview.dash.get_child_at_index(0).set_style(
                `background-color:rgba(0,0,0,${this.prefs.DASH_OPACITY.get()})`
            );
        }
    }

    disable() {
        this._log("removing blur from dash");

        if (Main.overview.dash.constructor.name == "Dash") {
            if (Main.screenShield && !Main.screenShield.locked) {
                try {
                    Main.overview.dash.get_child_at_index(0).style = null;
                } catch (e) {
                    this._log(e);
                }
            }
        }

        this.connections.disconnect_all();
        this.enabled = false;
    }

    _log(str) {
        if (this.prefs.DEBUG.get())
            log(`[Blur my Shell] ${str}`);
    }
};