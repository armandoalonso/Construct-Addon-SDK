
const C3 = globalThis.C3;

const tempQuad = new C3.Quad();

C3.Plugins.MyCompany_DrawingPlugin.Instance = class DrawingInstance extends globalThis.ISDKWorldInstanceBase
{
	constructor()
	{
		super();
		
		this._testProperty = 0;
		
		const properties = this._getInitProperties();
		if (properties)
		{
			this._testProperty = properties[0];
		}
	}
	
	_release()
	{
		super._release();
	}
	
	_draw(renderer)
	{
		const imageInfo = this.objectType.getImageInfo();
		const texture = imageInfo.getTexture(renderer);
		
		if (!texture)
			return;			// dynamic texture load which hasn't completed yet; can't draw anything
		
		let quad = this.getBoundingQuad();
		const rcTex = imageInfo.getTexRect();
		
		renderer.setTexture(texture);
		
		if (this.runtime.isPixelRoundingEnabled)
		{
			const ox = Math.round(this.x) - this.x;
			const oy = Math.round(this.y) - this.y;

			if (ox !== 0 && oy !== 0)
			{
				quad = new DOMQuad(new DOMPoint(quad.p1.x + ox, quad.p1.y + oy),
								   new DOMPoint(quad.p2.x + ox, quad.p2.y + oy),
								   new DOMPoint(quad.p3.x + ox, quad.p3.y + oy),
								   new DOMPoint(quad.p4.x + ox, quad.p4.y + oy));
			}
		}
		
		renderer.quad3(quad, rcTex);
	}
	
	_saveToJson()
	{
		return {
			// data to be saved for savegames
		};
	}
	
	_loadFromJson(o)
	{
		// load state for savegames
	}

	_setTestProperty(n)
	{
		this._testProperty = n;
	}

	_getTestProperty()
	{
		return this._testProperty;
	}
};
